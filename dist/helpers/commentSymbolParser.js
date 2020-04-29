"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var esFeatures_1 = require("./esFeatures");
var ProcessResult;
(function (ProcessResult) {
    ProcessResult[ProcessResult["Continue"] = 0] = "Continue";
    ProcessResult[ProcessResult["ContinueNoCapture"] = 1] = "ContinueNoCapture";
    ProcessResult[ProcessResult["Completed"] = 2] = "Completed";
    ProcessResult[ProcessResult["Break"] = 3] = "Break";
})(ProcessResult = exports.ProcessResult || (exports.ProcessResult = {}));
function commentSymbolParser(comment) {
    var captureChars = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        captureChars[_i - 1] = arguments[_i];
    }
    if (captureChars.length === 0) {
        throw new Error('no capture chars');
    }
    var result = [];
    var currentCaptureChar;
    var currentComment = '';
    var processingText = '';
    function setCurrentCaptureChar(char) {
        var didSet = false;
        if (currentCaptureChar === undefined) {
            currentCaptureChar = esFeatures_1.arrayFind(captureChars, (function (cc) { return cc.char === char; }));
            didSet = true;
        }
        return didSet;
    }
    function reset() {
        if (currentCaptureChar) {
            currentCaptureChar.processedText = '';
            currentCaptureChar.reset && currentCaptureChar.reset();
            currentCaptureChar = undefined;
            processingText = '';
        }
    }
    function processText(text) {
        for (var x = 0, c = ''; c = text.charAt(x); x++) {
            var didSet = setCurrentCaptureChar(c);
            if (currentCaptureChar === undefined) {
                currentComment += c;
            }
            else {
                if (!didSet) {
                    var processResult = currentCaptureChar.process(c);
                    switch (processResult) {
                        case ProcessResult.Completed:
                            if (currentComment) {
                                result.push(currentComment);
                                currentComment = '';
                            }
                            result.push(currentCaptureChar.getCompleted());
                            reset();
                            break;
                        case ProcessResult.Break:
                            currentComment += currentCaptureChar.char;
                            var backtrackText = processingText + c;
                            reset();
                            processText(backtrackText);
                            break;
                        case ProcessResult.Continue:
                            currentCaptureChar.processedText += c;
                            processingText += c;
                            break;
                        case ProcessResult.ContinueNoCapture:
                            processingText += c;
                            break;
                    }
                }
            }
        }
    }
    processText(comment);
    while (currentCaptureChar !== undefined) {
        currentComment += currentCaptureChar.char;
        var backtrackText = processingText;
        reset();
        processText(backtrackText);
    }
    if (currentComment) {
        result.push(currentComment);
    }
    return result;
}
exports.commentSymbolParser = commentSymbolParser;
//# sourceMappingURL=commentSymbolParser.js.map