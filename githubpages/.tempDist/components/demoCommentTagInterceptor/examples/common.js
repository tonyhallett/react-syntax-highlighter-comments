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
var react_syntax_highlighter_editable_1 = require("react-syntax-highlighter-editable");
var prism_1 = require("react-syntax-highlighter/dist/esm/styles/prism");
var src_1 = require("../../../../../src");
var react_syntax_highlighter_1 = require("react-syntax-highlighter");
exports.ExampleCode = function (_a) {
    var children = _a.children, additionalStyle = _a.additionalStyle, commentTagProvider = _a.commentTagProvider, respectStyleProp = _a.respectStyleProp, _b = _a.rows, rows = _b === void 0 ? 2 : _b, _c = _a.columns, columns = _c === void 0 ? 100 : _c;
    return React.createElement(react_syntax_highlighter_editable_1.EditableRSH, { initialCode: children, rows: rows, columns: columns, renderSH: function (code) {
            return React.createElement(src_1.SyntaxHighlighterComments, { colourComments: false, commentClasses: false, commentLinks: false, commentRemoval: false, dollarCommentSplit: false, inlineStyles: false, nodeObjectPropertyAttacher: false, splitCommentChars: false, tripleAsterisk: false, referenceStyles: false, mergeStyles: false, commentTagProvider: commentTagProvider, respectStyleProp: respectStyleProp },
                React.createElement(react_syntax_highlighter_1.Prism, { language: 'tsx', style: __assign(__assign({}, prism_1.atomDark), additionalStyle) }, code));
        } });
};
exports.createOnlyComponentProvider = function (only) {
    var componentProvider = function (tagName) {
        if (only.displayName === tagName) {
            return only;
        }
        throw new Error();
    };
    return componentProvider;
};
