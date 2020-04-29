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
Object.defineProperty(exports, "__esModule", { value: true });
var commentSymbolParser_1 = require("../../helpers/commentSymbolParser");
var string_object_to_object_1 = require("string-object-to-object");
var StringToObjectCaptureChar_1 = require("../../helpers/StringToObjectCaptureChar");
var TypeCaptureChar = /** @class */ (function (_super) {
    __extends(TypeCaptureChar, _super);
    function TypeCaptureChar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.char = '&';
        _this.name = '';
        _this.ignoringNameWhitespace = false;
        _this.reset = function () {
            _this.result = undefined;
            _this.stringToObjectParser = undefined;
            _this.name = '';
            _this.ignoringNameWhitespace = false;
            _this.props = undefined;
        };
        _this.process = function (char) {
            if (char === _this.char) {
                if (_this.stringToObjectParser === undefined) {
                    //if undefined either have not encountered { or 
                    //has parsed props and there is a result
                    if (_this.result === undefined) {
                        if (_this.processedText === '') {
                            return commentSymbolParser_1.ProcessResult.Break;
                        }
                        _this.result = { name: _this.processedText };
                    }
                    return commentSymbolParser_1.ProcessResult.Completed;
                }
                else {
                    return _this.processWithStringToObjectParser(char);
                }
            }
            else {
                switch (char) {
                    case '{':
                        if (_this.result || _this.processedText === '') {
                            return commentSymbolParser_1.ProcessResult.Break;
                        }
                        if (_this.stringToObjectParser === undefined) {
                            _this.stringToObjectParser = new string_object_to_object_1.StringToObjectParser();
                            _this.name = _this.processedText;
                            return commentSymbolParser_1.ProcessResult.Continue;
                        }
                        else {
                            //cannot complete
                            return _this.processWithStringToObjectParser(char);
                        }
                    default:
                        if (_this.stringToObjectParser) {
                            var result = _this.processWithStringToObjectParser(char);
                            if (result === commentSymbolParser_1.ProcessResult.Completed) {
                                _this.result = {
                                    name: _this.name,
                                    props: _this.props
                                };
                                return commentSymbolParser_1.ProcessResult.Continue;
                            }
                            return result;
                        }
                        var isWhitespace = char.trim() === '';
                        if (_this.result) {
                            return isWhitespace ? commentSymbolParser_1.ProcessResult.Continue : commentSymbolParser_1.ProcessResult.Break;
                        }
                        // the name
                        if (_this.processedText === '' && isWhitespace) {
                            return commentSymbolParser_1.ProcessResult.Break;
                        }
                        if (isWhitespace) {
                            _this.ignoringNameWhitespace = true;
                            return commentSymbolParser_1.ProcessResult.ContinueNoCapture;
                        }
                        if (_this.ignoringNameWhitespace) {
                            return commentSymbolParser_1.ProcessResult.Break;
                        }
                        var aToZ = char.match(/[a-zA-Z]/);
                        return aToZ ? commentSymbolParser_1.ProcessResult.Continue : commentSymbolParser_1.ProcessResult.Break;
                }
            }
        };
        _this.getCompleted = function () {
            return _this.result;
        };
        return _this;
    }
    TypeCaptureChar.prototype.stringToObjectCompleted = function (completed) {
        this.props = completed;
    };
    return TypeCaptureChar;
}(StringToObjectCaptureChar_1.StringToObjectCaptureChar));
exports.TypeCaptureChar = TypeCaptureChar;
exports.typeCaptureChar = new TypeCaptureChar();
//# sourceMappingURL=typeCaptureChar.js.map