"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_syntax_highlighter_renderer_interceptor_1 = require("react-syntax-highlighter-renderer-interceptor");
function nodeIsPlainText(node) {
    return node.type === 'element' && node.properties.className.indexOf('plain-text') !== -1;
}
exports.nodeIsPlainText = nodeIsPlainText;
var TagStack = /** @class */ (function () {
    function TagStack() {
        this.stack = [];
        this.originalNodes = [];
    }
    TagStack.prototype.isNextSibling = function (key) {
        if (react_syntax_highlighter_renderer_interceptor_1.keyIsNextSibling(this.rootKey, key)) {
            this.rootKey = key;
            return true;
        }
        return false;
    };
    TagStack.prototype.pushOriginalNodes = function (nodeRenderDetails) {
        nodeRenderDetails.node.tagProcessed = true;
        if (this.rootKey === undefined) {
            this.rootKey = nodeRenderDetails.key;
            this.originalNodes.push(nodeRenderDetails.node);
        }
        else {
            if (this.isNextSibling(nodeRenderDetails.key)) {
                this.originalNodes.push(nodeRenderDetails.node);
            }
        }
    };
    TagStack.prototype.ignoreComponentTypeWhenNoStack = function (componentType) {
        if (this.stack.length === 0 && (componentType === React.Fragment || typeof componentType === 'string')) {
            return true;
        }
        return false;
    };
    TagStack.prototype.ensureNoDoubleChildren = function (nodeRenderDetails) {
        var node = nodeRenderDetails.node;
        this.ensureNoDoubleChildrenOnNode(node);
        return nodeRenderDetails;
    };
    TagStack.prototype.ensureNoDoubleChildrenOnNode = function (node) {
        var _this = this;
        if (node.properties.children !== undefined && node.children.length > 0) {
            delete node.properties.children;
        }
        node.children.forEach(function (n) {
            _this.ensureNoDoubleChildrenOnNode(n);
        });
    };
    TagStack.prototype.getLastEntry = function () {
        return this.stack[this.stack.length - 1];
    };
    TagStack.prototype.processStart = function (nodeRenderDetails, componentType, tagName, properties) {
        if (this.ignoreComponentTypeWhenNoStack(componentType)) {
            return nodeRenderDetails;
        }
        this.stack.push({ componentType: componentType, tagName: tagName, properties: properties, children: [] });
        this.pushOriginalNodes(nodeRenderDetails);
        return undefined;
    };
    TagStack.prototype.processNonTagNode = function (nodeRenderDetails) {
        if (this.stack.length > 0) {
            var node = nodeRenderDetails.node;
            if (nodeIsPlainText(node)) {
                var childText = node.children[0].value;
                var lastEntry = this.stack[this.stack.length - 1];
                lastEntry.properties.children = childText;
                this.pushOriginalNodes(nodeRenderDetails);
                return undefined;
            }
            return this.bail(nodeRenderDetails);
        }
        else {
            return nodeRenderDetails;
        }
    };
    TagStack.prototype.processSelfClosing = function (nodeRenderDetails, componentType, properties) {
        if (this.ignoreComponentTypeWhenNoStack(componentType)) {
            return nodeRenderDetails;
        }
        var node = { type: 'element', tagName: componentType, properties: properties, children: [] };
        if (this.stack.length > 0) {
            var entry = this.getLastEntry();
            entry.children.push(node);
            this.pushOriginalNodes(nodeRenderDetails);
            return undefined;
        }
        else {
            return {
                useInlineStyles: nodeRenderDetails.useInlineStyles,
                stylesheet: nodeRenderDetails.stylesheet,
                key: nodeRenderDetails.key,
                node: node
            };
        }
    };
    TagStack.prototype.processEnd = function (nodeRenderDetails, tagName) {
        if (this.stack.length > 0) {
            var lastEntry = this.getLastEntry();
            if (lastEntry.tagName === tagName) {
                lastEntry = this.stack.pop();
                var node = {
                    type: 'element',
                    properties: lastEntry.properties,
                    tagName: lastEntry.componentType,
                    children: lastEntry.children
                };
                if (this.stack.length === 0) {
                    this.cleanUp();
                    return this.ensureNoDoubleChildren({
                        key: nodeRenderDetails.key,
                        stylesheet: nodeRenderDetails.stylesheet,
                        useInlineStyles: nodeRenderDetails.useInlineStyles,
                        node: node
                    });
                }
                else {
                    var lastEntry_1 = this.getLastEntry();
                    lastEntry_1.children.push(node);
                    this.pushOriginalNodes(nodeRenderDetails);
                    return undefined;
                }
            }
            else {
                return this.bail(nodeRenderDetails);
            }
        }
        this.cleanUp();
        return nodeRenderDetails;
    };
    TagStack.prototype.cleanUp = function () {
        this.originalNodes = [];
        this.stack = [];
        this.rootKey = undefined;
    };
    TagStack.prototype.bail = function (nodeRenderDetails) {
        if (this.stack.length > 0) {
            this.pushOriginalNodes(nodeRenderDetails);
            var wrapNode = {
                type: 'element',
                tagName: React.Fragment,
                children: this.originalNodes,
                properties: { className: [] }
            };
            var bailed = {
                key: nodeRenderDetails.key,
                stylesheet: nodeRenderDetails.stylesheet,
                useInlineStyles: nodeRenderDetails.useInlineStyles,
                node: wrapNode
            };
            this.cleanUp();
            return bailed;
        }
        this.cleanUp();
        return nodeRenderDetails;
    };
    TagStack.prototype.nodeProcessed = function (node) {
        return !!node.tagProcessed;
    };
    return TagStack;
}());
exports.TagStack = TagStack;
//# sourceMappingURL=TagStack.js.map