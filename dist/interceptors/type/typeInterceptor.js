"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var commentHofs_1 = require("../../helpers/commentHofs");
var commentSymbolParser_1 = require("../../helpers/commentSymbolParser");
var common_1 = require("../../common");
var typeCaptureChar_1 = require("./typeCaptureChar");
var esFeatures_1 = require("../../helpers/esFeatures");
function createTypeInterceptor() {
    var typeDetails = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        typeDetails[_i] = arguments[_i];
    }
    function createChildNodes(parsed) {
        var childNodes = [];
        var _loop_1 = function (i) {
            var commentOrCustomType = parsed[i];
            if (typeof commentOrCustomType === 'string') {
                childNodes.push(common_1.createCommentNode(commentOrCustomType));
            }
            else {
                var matchingType = esFeatures_1.arrayFind(typeDetails, function (td) { return td.name === commentOrCustomType.name; });
                var tagName = void 0;
                if (matchingType === undefined) {
                    var reactElementName = commentOrCustomType.name.trim();
                    if (reactElementName[0].toLowerCase() === reactElementName[0]) {
                        tagName = reactElementName;
                    }
                    else {
                        return "continue";
                    }
                }
                else {
                    tagName = matchingType.component;
                }
                var props = commentOrCustomType.props ? commentOrCustomType.props : {};
                var typeNode = {
                    tagName: tagName,
                    type: 'element',
                    properties: __assign({ className: [] }, props),
                    children: []
                };
                childNodes.push(typeNode);
            }
        };
        for (var i = 0; i < parsed.length; i++) {
            _loop_1(i);
        }
        return childNodes;
    }
    return commentHofs_1.createCommentNodeRenderInterceptor(function (nodeRenderDetails) {
        var comment = common_1.getCommentTextNode(nodeRenderDetails.node).value;
        var parsed = commentSymbolParser_1.commentSymbolParser(comment, typeCaptureChar_1.typeCaptureChar);
        if (parsed.length > 1) {
            nodeRenderDetails.node = {
                properties: {
                    className: [],
                },
                type: 'element',
                tagName: 'span',
                children: createChildNodes(parsed)
            };
        }
        return nodeRenderDetails;
    });
}
exports.createTypeInterceptor = createTypeInterceptor;
//# sourceMappingURL=typeInterceptor.js.map