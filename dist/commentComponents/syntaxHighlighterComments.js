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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_syntax_highlighter_renderer_interceptor_1 = require("react-syntax-highlighter-renderer-interceptor");
var commentTagInterceptor_1 = require("../interceptors/commentTagInterceptor");
var tripleAsteriskCommentColourer_1 = require("../stylers/colourers/tripleAsteriskCommentColourer");
var commentColourer_1 = require("../stylers/colourers/commentColourer");
var inlineStyler_1 = require("../stylers/inlineStyler");
var referenceStyler_1 = require("../stylers/referenceStyler");
var nodeObjectPropertyAttacher_1 = require("../interceptors/nodeObjectPropertyAttacher");
var commentSplitters_1 = require("../interceptors/commentSplitters");
var commentClassProvider_1 = require("../interceptors/commentClassProvider");
var commentLinkInterceptor_1 = require("../interceptors/links/commentLinkInterceptor");
var typeInterceptor_1 = require("../interceptors/type/typeInterceptor");
var __1 = require("..");
var createCommentMatchReplaceStyler_1 = require("../stylers/styler creators/createCommentMatchReplaceStyler");
var commentCharsStyler_1 = require("../stylers/commentCharsStyler");
var mergeStyle_1 = require("./mergeStyle");
var common_1 = require("./common");
exports.SyntaxHighlighterComments = function (_a) {
    var commentMatchReplaceStyler = _a.commentMatchReplaceStyler, _b = _a.splitCommentChars, splitCommentChars = _b === void 0 ? true : _b, // opt out
    _c = _a.dollarCommentSplit, // opt out
    dollarCommentSplit = _c === void 0 ? true : _c, // opt out
    commentCharsStyingOptions = _a.commentCharsStyingOptions, // opt in
    commentTagProvider = _a.commentTagProvider, // opt in
    respectStyleProp = _a.respectStyleProp, // opt out
    typeInterceptorDetails = _a.typeInterceptorDetails, // opt in
    children = _a.children, _d = _a.tripleAsterisk, tripleAsterisk = _d === void 0 ? true : _d, // opt out
    _e = _a.colourComments, // opt out
    colourComments = _e === void 0 ? true : _e, // opt out
    _f = _a.inlineStyles, // opt out
    inlineStyles = _f === void 0 ? true : _f, // opt out
    _g = _a.referenceStyles, // opt out
    referenceStyles = _g === void 0 ? true : _g, //opt out
    _h = _a.nodeObjectPropertyAttacher, //opt out
    nodeObjectPropertyAttacher = _h === void 0 ? true : _h, //opt out
    _j = _a.commentRemoval, //opt out
    commentRemoval = _j === void 0 ? /\!{3}/ : _j, //opt out
    _k = _a.commentClasses, //opt out
    commentClasses = _k === void 0 ? true : _k, //opt out
    _l = _a.commentLinks, //opt out
    commentLinks = _l === void 0 ? true : _l, //opt out
    _m = _a.linkTarget, //opt out
    linkTarget = _m === void 0 ? '_blank' : _m, _o = _a.mergeStyles //opt out
    , mergeStyles = _o === void 0 ? true : _o //opt out
    ;
    if (respectStyleProp !== undefined && commentTagProvider === undefined) {
        throw new Error('commentTagProvider is required for respectStyleProp');
    }
    common_1.checkCommentCharsDependency(commentCharsStyingOptions, splitCommentChars);
    if (nodeObjectPropertyAttacher === false && referenceStyles !== false) {
        throw new Error('nodeObjectPropertyAttacher is required for reference styles');
    }
    var child = React.Children.only(children);
    var style = child.props.style;
    common_1.checkMergeStylesDependency(mergeStyles, commentClasses);
    if (mergeStyles && commentClasses) {
        style = __assign(__assign({}, style), mergeStyle_1.mergeStyle);
    }
    var addCommentTagInterceptor = child.props.language === 'tsx';
    var customRenderer = React.useMemo(function () {
        return react_syntax_highlighter_renderer_interceptor_1.createCustomRenderer(react_syntax_highlighter_renderer_interceptor_1.createChainedStyleCreator(tripleAsterisk === false ? undefined : tripleAsteriskCommentColourer_1.createTripleAsteriskCommentColourer(tripleAsterisk === true ? 'red' : tripleAsterisk), colourComments ? commentColourer_1.commentColourer : undefined, inlineStyles ? inlineStyler_1.inlineStyler : undefined, referenceStyles ? referenceStyler_1.referenceStyler : undefined, commentCharsStyingOptions ? commentCharsStyler_1.createCommentCharsStyler(commentCharsStyingOptions) : undefined, commentMatchReplaceStyler ? createCommentMatchReplaceStyler_1.createCommentMatchReplaceStyler(commentMatchReplaceStyler) : undefined), react_syntax_highlighter_renderer_interceptor_1.createChainedNodeRenderInterceptor(addCommentTagInterceptor && commentTagProvider ? commentTagInterceptor_1.createCommentTagInterceptor(commentTagProvider, respectStyleProp) : undefined, nodeObjectPropertyAttacher ? nodeObjectPropertyAttacher_1.createNodeObjectPropertyAttacher() : undefined, commentRemoval === false ? undefined : __1.createCommentRemover(commentRemoval), splitCommentChars ? commentSplitters_1.splitCommentChars : undefined, //order of these does not matter
        typeInterceptorDetails ? typeInterceptor_1.createTypeInterceptor.apply(void 0, typeInterceptorDetails) : undefined, dollarCommentSplit ? commentSplitters_1.dollarCommentSplitter : undefined, commentClasses ? commentClassProvider_1.commentClassProvider : undefined, //after the splitting
        commentLinks ? commentLinkInterceptor_1.createTargetedCommentLinkInterceptor(linkTarget) : undefined));
    }, [
        addCommentTagInterceptor,
        commentLinks,
        linkTarget,
        commentClasses,
        dollarCommentSplit,
        colourComments,
        inlineStyles,
        referenceStyles,
        commentTagProvider,
        respectStyleProp,
        typeInterceptorDetails,
        splitCommentChars,
        tripleAsterisk,
        nodeObjectPropertyAttacher,
        commentLinks,
        commentCharsStyingOptions,
        commentRemoval,
        commentMatchReplaceStyler
    ]);
    return common_1.cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse(child, customRenderer, style);
};
//# sourceMappingURL=syntaxHighlighterComments.js.map