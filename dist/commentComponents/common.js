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
function checkCommentCharsDependency(commentCharsStyingOptions, splitCommentChars) {
    if (commentCharsStyingOptions && !splitCommentChars) {
        throw new Error('commentCharsStylingOptions requires splitCommentChars true');
    }
}
exports.checkCommentCharsDependency = checkCommentCharsDependency;
function checkMergeStylesDependency(mergeStyles, commentClasses) {
    if (mergeStyles && !commentClasses) {
        throw new Error('mergeStyles is to be used with commentClasses');
    }
}
exports.checkMergeStylesDependency = checkMergeStylesDependency;
function cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse(child, customRenderer, style) {
    if (style) {
        return React.cloneElement(child, { renderer: customRenderer, style: style, wrapLines: false });
    }
    return React.cloneElement(child, { renderer: customRenderer, wrapLines: false });
}
exports.cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse = cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse;
//# sourceMappingURL=common.js.map