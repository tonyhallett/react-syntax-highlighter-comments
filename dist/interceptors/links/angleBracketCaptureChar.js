"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commentSymbolParser_1 = require("../../helpers/commentSymbolParser");
var AngleBracketCaptureChar = /** @class */ (function () {
    function AngleBracketCaptureChar() {
        var _this = this;
        this.char = '<';
        this.getCompleted = function () {
            return {
                url: _this.processedText
            };
        };
        this.process = function (char) {
            if (char.trim() === '') {
                return commentSymbolParser_1.ProcessResult.Break;
            }
            switch (char) {
                case '<':
                    return commentSymbolParser_1.ProcessResult.Break;
                case '>':
                    if (_this.processedText.length === 0) {
                        return commentSymbolParser_1.ProcessResult.Break;
                    }
                    return commentSymbolParser_1.ProcessResult.Completed;
                default:
                    return commentSymbolParser_1.ProcessResult.Continue;
            }
        };
        this.processedText = '';
    }
    return AngleBracketCaptureChar;
}());
exports.AngleBracketCaptureChar = AngleBracketCaptureChar;
exports.angleBracketCaptureChar = new AngleBracketCaptureChar();
//# sourceMappingURL=angleBracketCaptureChar.js.map