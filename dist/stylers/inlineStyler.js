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
var commentSymbolParser_1 = require("../helpers/commentSymbolParser");
var common_1 = require("../common");
var string_object_to_object_1 = require("string-object-to-object");
var StringToObjectCaptureChar_1 = require("../helpers/StringToObjectCaptureChar");
var InlineStyleCaptureChar = /** @class */ (function (_super) {
    __extends(InlineStyleCaptureChar, _super);
    function InlineStyleCaptureChar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.char = '^';
        _this.getCompleted = function () {
            return _this.inlineStyle;
        };
        _this.process = function (char) {
            if (_this.inlineStyle && char !== _this.char) {
                if (char.trim() === '') {
                    return commentSymbolParser_1.ProcessResult.Continue;
                }
                return commentSymbolParser_1.ProcessResult.Break;
            }
            if (char === _this.char) {
                if (_this.stringToObjectParser !== undefined) {
                    return _this.processWithStringToObjectParser(char);
                }
                return commentSymbolParser_1.ProcessResult.Completed;
            }
            if (char === '{') {
                if (_this.stringToObjectParser === undefined) {
                    _this.stringToObjectParser = new string_object_to_object_1.StringToObjectParser();
                    return commentSymbolParser_1.ProcessResult.Continue;
                }
                return _this.processWithStringToObjectParser(char);
            }
            else {
                if (_this.stringToObjectParser === undefined) {
                    return commentSymbolParser_1.ProcessResult.Continue;
                }
                if (char === '}') {
                    var result = _this.processWithStringToObjectParser(char);
                    if (result === commentSymbolParser_1.ProcessResult.Completed) {
                        result = commentSymbolParser_1.ProcessResult.Continue;
                    }
                    return result;
                }
                return _this.processWithStringToObjectParser(char);
            }
        };
        return _this;
    }
    InlineStyleCaptureChar.prototype.stringToObjectCompleted = function (completed) {
        this.inlineStyle = completed;
    };
    InlineStyleCaptureChar.prototype.reset = function () {
        this.inlineStyle = undefined;
        this.stringToObjectParser = undefined;
    };
    return InlineStyleCaptureChar;
}(StringToObjectCaptureChar_1.StringToObjectCaptureChar));
exports.inlineStyler = commentHofs_1.createCommentStyleCreator(function (currentStyle, classNames, node) {
    var captureChar = new InlineStyleCaptureChar();
    var commentTextNode = common_1.getCommentTextNode(node);
    var parsed = commentSymbolParser_1.commentSymbolParser(commentTextNode.value, captureChar);
    if (parsed.length > 1) {
        var comments_1 = [];
        var mergeStyle_1;
        parsed.forEach(function (commentOrStyle) {
            if (typeof commentOrStyle === 'string') {
                comments_1.push(commentOrStyle);
            }
            else {
                mergeStyle_1 = commentOrStyle;
            }
        });
        commentTextNode.value = comments_1.join('');
        currentStyle = __assign(__assign({}, currentStyle), mergeStyle_1);
    }
    return currentStyle;
});
//# sourceMappingURL=inlineStyler.js.map