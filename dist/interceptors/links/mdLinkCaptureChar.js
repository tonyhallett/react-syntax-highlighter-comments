"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commentSymbolParser_1 = require("../../helpers/commentSymbolParser");
var MdLinkState;
(function (MdLinkState) {
    MdLinkState[MdLinkState["OpenSquare"] = 0] = "OpenSquare";
    MdLinkState[MdLinkState["ClosedSquare"] = 1] = "ClosedSquare";
    MdLinkState[MdLinkState["OpenRound"] = 2] = "OpenRound";
})(MdLinkState = exports.MdLinkState || (exports.MdLinkState = {}));
var MdLinkCaptureChar = /** @class */ (function () {
    function MdLinkCaptureChar() {
        var _this = this;
        this.state = MdLinkState.OpenSquare;
        this.url = '';
        this.linkText = '';
        this.char = '[';
        this.processedText = '';
        this.reset = function () {
            _this.linkText = '';
            _this.url = '';
            _this.state = MdLinkState.OpenSquare;
        };
        this.getCompleted = function () {
            var mdLink = {
                url: _this.url,
                linkText: _this.linkText
            };
            return mdLink;
        };
        this.process = function (char) {
            switch (char) {
                case '[':
                    return commentSymbolParser_1.ProcessResult.Break;
                case ']':
                    if (_this.state === MdLinkState.OpenSquare && _this.linkText.length > 0) {
                        _this.state = MdLinkState.ClosedSquare;
                        return commentSymbolParser_1.ProcessResult.Continue;
                    }
                    return commentSymbolParser_1.ProcessResult.Break;
                case '(':
                    switch (_this.state) {
                        case MdLinkState.OpenSquare:
                            _this.linkText += '(';
                            return commentSymbolParser_1.ProcessResult.Continue;
                        case MdLinkState.ClosedSquare:
                            _this.state = MdLinkState.OpenRound;
                            return commentSymbolParser_1.ProcessResult.Continue;
                        case MdLinkState.OpenRound:
                            return commentSymbolParser_1.ProcessResult.Break;
                    }
                case ')':
                    switch (_this.state) {
                        case MdLinkState.OpenSquare:
                            _this.linkText += ')';
                            return commentSymbolParser_1.ProcessResult.Continue;
                        case MdLinkState.ClosedSquare:
                            return commentSymbolParser_1.ProcessResult.Break;
                        case MdLinkState.OpenRound:
                            return _this.url.length === 0 ? commentSymbolParser_1.ProcessResult.Break : commentSymbolParser_1.ProcessResult.Completed;
                    }
                default:
                    switch (_this.state) {
                        case MdLinkState.OpenSquare:
                            _this.linkText += char;
                            return commentSymbolParser_1.ProcessResult.Continue;
                        case MdLinkState.ClosedSquare:
                            return commentSymbolParser_1.ProcessResult.Break;
                        case MdLinkState.OpenRound:
                            _this.url += char;
                            return commentSymbolParser_1.ProcessResult.Continue;
                    }
            }
        };
    }
    return MdLinkCaptureChar;
}());
exports.MdLinkCaptureChar = MdLinkCaptureChar;
exports.mdLinkCaptureChar = new MdLinkCaptureChar();
//# sourceMappingURL=mdLinkCaptureChar.js.map