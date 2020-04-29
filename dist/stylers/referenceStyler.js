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
var commentHofs_1 = require("../helpers/commentHofs");
var common_1 = require("../common");
var commentSymbolParser_1 = require("../helpers/commentSymbolParser");
var ReferenceStylerCaptureChar = /** @class */ (function () {
    function ReferenceStylerCaptureChar() {
        this.char = '%';
        this.processedText = '';
    }
    ReferenceStylerCaptureChar.prototype.process = function (char) {
        if (char === this.char) {
            return commentSymbolParser_1.ProcessResult.Completed;
        }
        return commentSymbolParser_1.ProcessResult.Continue;
    };
    ReferenceStylerCaptureChar.prototype.getCompleted = function () {
        return {
            classes: this.processedText
        };
    };
    return ReferenceStylerCaptureChar;
}());
exports.ReferenceStylerCaptureChar = ReferenceStylerCaptureChar;
exports.referenceStylerCaptureChar = new ReferenceStylerCaptureChar();
exports.referenceStyler = commentHofs_1.createCommentStyleCreator(function (currentStyle, classNames, node) {
    var refStyle = node.refStyle;
    if (refStyle) {
        var commentTextNode = common_1.getCommentTextNode(node);
        var parsed = commentSymbolParser_1.commentSymbolParser(commentTextNode.value, exports.referenceStylerCaptureChar);
        if (parsed.length > 1) {
            var comments = '';
            for (var i = 0; i < parsed.length; i++) {
                var commentOrResult = parsed[i];
                if (typeof commentOrResult === 'string') {
                    comments += commentOrResult;
                }
                else {
                    var classes = commentOrResult.classes.split(' ');
                    classes.forEach(function (cl) {
                        if (refStyle[cl]) {
                            currentStyle = __assign(__assign({}, currentStyle), refStyle[cl]);
                        }
                    });
                }
            }
            commentTextNode.value = comments;
        }
    }
    return currentStyle;
});
//# sourceMappingURL=referenceStyler.js.map