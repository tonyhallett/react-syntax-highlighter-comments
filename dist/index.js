"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var commentHofs_1 = require("./helpers/commentHofs");
exports.createCommentNodeRenderInterceptor = commentHofs_1.createCommentNodeRenderInterceptor;
exports.createCommentStyleCreator = commentHofs_1.createCommentStyleCreator;
var commentSymbolParser_1 = require("./helpers/commentSymbolParser");
exports.ProcessResult = commentSymbolParser_1.ProcessResult;
exports.commentSymbolParser = commentSymbolParser_1.commentSymbolParser;
var StringToObjectCaptureChar_1 = require("./helpers/StringToObjectCaptureChar");
exports.StringToObjectCaptureChar = StringToObjectCaptureChar_1.StringToObjectCaptureChar;
var commentClassProvider_1 = require("./interceptors/commentClassProvider");
exports.commentClassProvider = commentClassProvider_1.commentClassProvider;
__export(require("./interceptors/commentTagInterceptor"));
var commentSplitters_1 = require("./interceptors/commentSplitters");
exports.splitCommentChars = commentSplitters_1.splitCommentChars;
exports.dollarCommentSplitter = commentSplitters_1.dollarCommentSplitter;
var nodeObjectPropertyAttacher_1 = require("./interceptors/nodeObjectPropertyAttacher");
exports.createNodeObjectPropertyAttacher = nodeObjectPropertyAttacher_1.createNodeObjectPropertyAttacher;
var commentLinkInterceptor_1 = require("./interceptors/links/commentLinkInterceptor");
exports.commentLinkInterceptorTargetBlank = commentLinkInterceptor_1.commentLinkInterceptorTargetBlank;
exports.commentLinkInterceptorTargetSelf = commentLinkInterceptor_1.commentLinkInterceptorTargetSelf;
var commentRemover_1 = require("./interceptors/removal/commentRemover");
exports.createCommentRemover = commentRemover_1.createCommentRemover;
var tripleExclamationCommentRemover_1 = require("./interceptors/removal/tripleExclamationCommentRemover");
exports.tripleExclamationCommentRemover = tripleExclamationCommentRemover_1.tripleExclamationCommentRemover;
var typeInterceptor_1 = require("./interceptors/type/typeInterceptor");
exports.createTypeInterceptor = typeInterceptor_1.createTypeInterceptor;
var commentColourer_1 = require("./stylers/colourers/commentColourer");
exports.commentColourer = commentColourer_1.commentColourer;
exports.commentColourRenderer = commentColourer_1.commentColourRenderer;
var tripleAsteriskCommentColourer_1 = require("./stylers/colourers/tripleAsteriskCommentColourer");
exports.createTripleAsteriskCommentColourer = tripleAsteriskCommentColourer_1.createTripleAsteriskCommentColourer;
exports.redTripleAsteriskCommentColourer = tripleAsteriskCommentColourer_1.redTripleAsteriskCommentColourer;
var createCommentMatchReplaceStyler_1 = require("./stylers/styler creators/createCommentMatchReplaceStyler");
exports.createCommentMatchReplaceStylerRegexString = createCommentMatchReplaceStyler_1.createCommentMatchReplaceStylerRegexString;
exports.createCommentMatchNOrMoreReplaceStyler = createCommentMatchReplaceStyler_1.createCommentMatchNOrMoreReplaceStyler;
exports.createCommentMatchReplaceStyler = createCommentMatchReplaceStyler_1.createCommentMatchReplaceStyler;
var inlineStyler_1 = require("./stylers/inlineStyler");
exports.inlineStyler = inlineStyler_1.inlineStyler;
var referenceStyler_1 = require("./stylers/referenceStyler");
exports.referenceStyler = referenceStyler_1.referenceStyler;
var commentCharsStyler_1 = require("./stylers/commentCharsStyler");
exports.createCommentCharsStyler = commentCharsStyler_1.createCommentCharsStyler;
__export(require("./commentComponents"));
//# sourceMappingURL=index.js.map