"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var commentHofs_1 = require("../helpers/commentHofs");
var common_1 = require("../common");
var commentSymbolParser_1 = require("../helpers/commentSymbolParser");
var StringToObjectCaptureChar_1 = require("../helpers/StringToObjectCaptureChar");
var string_object_to_object_1 = require("string-object-to-object");
var NodeObjectPropertyCaptureCharState;
(function (NodeObjectPropertyCaptureCharState) {
    NodeObjectPropertyCaptureCharState[NodeObjectPropertyCaptureCharState["Initial"] = 0] = "Initial";
    NodeObjectPropertyCaptureCharState[NodeObjectPropertyCaptureCharState["OpenSquare"] = 1] = "OpenSquare";
    NodeObjectPropertyCaptureCharState[NodeObjectPropertyCaptureCharState["ClosedSquare"] = 2] = "ClosedSquare";
    NodeObjectPropertyCaptureCharState[NodeObjectPropertyCaptureCharState["StringToObject"] = 3] = "StringToObject";
})(NodeObjectPropertyCaptureCharState = exports.NodeObjectPropertyCaptureCharState || (exports.NodeObjectPropertyCaptureCharState = {}));
var NodeObjectPropertyCaptureChar = /** @class */ (function (_super) {
    __extends(NodeObjectPropertyCaptureChar, _super);
    function NodeObjectPropertyCaptureChar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propertyName = '';
        _this.state = NodeObjectPropertyCaptureCharState.Initial;
        _this.char = '~';
        return _this;
    }
    NodeObjectPropertyCaptureChar.prototype.reset = function () {
        this.propertyName = '';
        this.state = NodeObjectPropertyCaptureCharState.Initial;
        this.value = undefined;
        this.stringToObjectParser = undefined;
    };
    NodeObjectPropertyCaptureChar.prototype.process = function (char) {
        switch (this.state) {
            case NodeObjectPropertyCaptureCharState.Initial:
                if (char === '[') {
                    this.state = NodeObjectPropertyCaptureCharState.OpenSquare;
                    return commentSymbolParser_1.ProcessResult.Continue;
                }
                return commentSymbolParser_1.ProcessResult.Break;
            case NodeObjectPropertyCaptureCharState.OpenSquare:
                if (char.trim() === '') {
                    //could use this in property name but intention unlikeley
                    return commentSymbolParser_1.ProcessResult.Continue;
                }
                if (char === ']') {
                    if (this.propertyName === '') {
                        return commentSymbolParser_1.ProcessResult.Break;
                    }
                    this.state = NodeObjectPropertyCaptureCharState.ClosedSquare;
                    return commentSymbolParser_1.ProcessResult.Continue;
                }
                this.propertyName += char;
                return commentSymbolParser_1.ProcessResult.Continue;
            case NodeObjectPropertyCaptureCharState.ClosedSquare:
                if (char.trim() === '') {
                    return commentSymbolParser_1.ProcessResult.Continue;
                }
                if (char === '{') {
                    this.state = NodeObjectPropertyCaptureCharState.StringToObject;
                    this.stringToObjectParser = new string_object_to_object_1.StringToObjectParser();
                    return commentSymbolParser_1.ProcessResult.Continue;
                }
                return commentSymbolParser_1.ProcessResult.Break;
            case NodeObjectPropertyCaptureCharState.StringToObject:
                return this.processWithStringToObjectParser(char);
        }
    };
    NodeObjectPropertyCaptureChar.prototype.getCompleted = function () {
        return {
            propertyName: this.propertyName,
            value: this.value
        };
    };
    NodeObjectPropertyCaptureChar.prototype.stringToObjectCompleted = function (completed) {
        this.value = completed;
    };
    return NodeObjectPropertyCaptureChar;
}(StringToObjectCaptureChar_1.StringToObjectCaptureChar));
exports.NodeObjectPropertyCaptureChar = NodeObjectPropertyCaptureChar;
exports.nodeObjectPropertyCaptureChar = new NodeObjectPropertyCaptureChar();
function createNodeObjectPropertyAttacher( /* tripleExclamationRemoval=true */) {
    var properties = {};
    return commentHofs_1.createCommentNodeRenderInterceptor(function (nodeRenderDetails) {
        var node = nodeRenderDetails.node;
        var commentTextNode = common_1.getCommentTextNode(node);
        var parsed = commentSymbolParser_1.commentSymbolParser(commentTextNode.value, exports.nodeObjectPropertyCaptureChar);
        if (parsed.length > 1) {
            for (var i = 0; i < parsed.length; i++) {
                var commentOrResult = parsed[i];
                if (typeof commentOrResult !== 'string') {
                    properties[commentOrResult.propertyName] = commentOrResult.value;
                    break;
                }
            }
            /*
              todo
              given that there could be any type of commentRemover - should replace tripleExclamationRemoval
              with a replacement string
      
              *** until comment remover is changed for full support of removal of spaces it is sufficient to return undefined
            */
            /* if(tripleExclamationRemoval){
              commentTextNode.value = '!!!';
              return nodeRenderDetails;
            } */
            return undefined;
        }
        else {
            if (Object.getOwnPropertyNames(properties).length > 0) {
                //should have a check for allowed property names ?
                nodeRenderDetails.node = __assign(__assign({}, node), properties);
                return nodeRenderDetails;
            }
            return nodeRenderDetails;
        }
    }, function () { return properties = {}; });
}
exports.createNodeObjectPropertyAttacher = createNodeObjectPropertyAttacher;
//# sourceMappingURL=nodeObjectPropertyAttacher.js.map