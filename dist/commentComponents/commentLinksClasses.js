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
var commentLinkInterceptor_1 = require("../interceptors/links/commentLinkInterceptor");
var commentRemover_1 = require("../interceptors/removal/commentRemover");
var commentSplitters_1 = require("../interceptors/commentSplitters");
var commentClassProvider_1 = require("../interceptors/commentClassProvider");
var commentCharsStyler_1 = require("../stylers/commentCharsStyler");
var mergeStyle_1 = require("./mergeStyle");
var common_1 = require("./common");
exports.CommentLinksAndClasses = function (_a) {
    var _b = _a.mergeStyles, mergeStyles = _b === void 0 ? true : _b, commentRemoval = _a.commentRemoval, dollarCommentSplit = _a.dollarCommentSplit, _c = _a.splitCommentChars, splitCommentChars = _c === void 0 ? true : _c, children = _a.children, commentCharsStyingOptions = _a.commentCharsStyingOptions, _d = _a.commentLinks, commentLinks = _d === void 0 ? true : _d, _e = _a.linkTarget, linkTarget = _e === void 0 ? '_blank' : _e;
    common_1.checkCommentCharsDependency(commentCharsStyingOptions, splitCommentChars);
    var child = React.Children.only(children);
    var style = child.props.style;
    if (mergeStyles) {
        style = __assign(__assign({}, style), mergeStyle_1.mergeStyle);
    }
    var customRenderer = React.useMemo(function () {
        return react_syntax_highlighter_renderer_interceptor_1.createCustomRenderer(commentCharsStyingOptions ? commentCharsStyler_1.createCommentCharsStyler(commentCharsStyingOptions) : undefined, react_syntax_highlighter_renderer_interceptor_1.createChainedNodeRenderInterceptor(commentRemoval ? commentRemover_1.createCommentRemover(commentRemoval === true ? /\!{3}/ : commentRemoval) : undefined, splitCommentChars ? commentSplitters_1.splitCommentChars : undefined, dollarCommentSplit ? commentSplitters_1.dollarCommentSplitter : undefined, commentClassProvider_1.commentClassProvider, commentLinks ? commentLinkInterceptor_1.createTargetedCommentLinkInterceptor(linkTarget) : undefined));
    }, [mergeStyles, commentRemoval, dollarCommentSplit, splitCommentChars, commentCharsStyingOptions, commentLinks, linkTarget]);
    return common_1.cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse(child, customRenderer, style);
};
//# sourceMappingURL=commentLinksClasses.js.map