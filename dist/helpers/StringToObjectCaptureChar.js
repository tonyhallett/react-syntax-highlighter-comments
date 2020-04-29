"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commentSymbolParser_1 = require("./commentSymbolParser");
var string_object_to_object_1 = require("string-object-to-object");
var StringToObjectCaptureChar = /** @class */ (function () {
    function StringToObjectCaptureChar() {
        this.processedText = '';
    }
    StringToObjectCaptureChar.prototype.processWithStringToObjectParser = function (char) {
        var stringToObjectResult = this.stringToObjectParser.process(char);
        switch (stringToObjectResult) {
            case string_object_to_object_1.ProcessResult.Break:
                return commentSymbolParser_1.ProcessResult.Break;
            case string_object_to_object_1.ProcessResult.Completed:
                this.stringToObjectCompleted(this.stringToObjectParser.getCompleted());
                this.stringToObjectParser = undefined;
                return commentSymbolParser_1.ProcessResult.Completed;
            case string_object_to_object_1.ProcessResult.Continue:
                return commentSymbolParser_1.ProcessResult.Continue;
        }
    };
    return StringToObjectCaptureChar;
}());
exports.StringToObjectCaptureChar = StringToObjectCaptureChar;
//# sourceMappingURL=StringToObjectCaptureChar.js.map