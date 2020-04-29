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
var react_syntax_highlighter_renderer_interceptor_1 = require("react-syntax-highlighter-renderer-interceptor");
var tripleAsteriskCommentColourer_1 = require("../stylers/colourers/tripleAsteriskCommentColourer");
var common_1 = require("./common");
exports.SyntaxHighlighterXXXComments = function (_a) {
    var color = _a.color, children = _a.children;
    var child = React.Children.only(children);
    var customRenderer = React.useMemo(function () {
        return react_syntax_highlighter_renderer_interceptor_1.createCustomRenderer(tripleAsteriskCommentColourer_1.createTripleAsteriskCommentColourer(color ? color : 'red'));
    }, [color]);
    return common_1.cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse(child, customRenderer);
};
//# sourceMappingURL=syntaxHighlighterXXXComments.js.map