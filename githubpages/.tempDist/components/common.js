"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_syntax_highlighter_1 = require("react-syntax-highlighter");
var ExpansionPanel_1 = __importDefault(require("@material-ui/core/ExpansionPanel"));
var ExpansionPanelSummary_1 = __importDefault(require("@material-ui/core/ExpansionPanelSummary"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
var src_1 = require("../../../src");
var Api = function (_a) {
    var children = _a.children, header = _a.header;
    return react_1.default.createElement(exports.Expandable, { header: header },
        react_1.default.createElement(src_1.CommentLinksAndColours, { commentLinks: false, commentClasses: false, commentRemoval: false, dollarCommentSplit: false, splitCommentChars: false },
            react_1.default.createElement(react_syntax_highlighter_1.Prism, { language: 'tsx' }, children)));
};
exports.ComponentApi = function (_a) {
    var children = _a.children;
    return react_1.default.createElement(Api, { header: 'Component API' }, children);
};
exports.InterceptorApi = function (_a) {
    var children = _a.children, _b = _a.isInterceptor, isInterceptor = _b === void 0 ? true : _b;
    return react_1.default.createElement(Api, { header: (isInterceptor ? 'Interceptor' : 'Style Creator') + " API" }, children);
};
exports.Expandable = function (_a) {
    var header = _a.header, children = _a.children;
    return react_1.default.createElement(ExpansionPanel_1.default, null,
        react_1.default.createElement(ExpansionPanelSummary_1.default, { expandIcon: react_1.default.createElement(ExpandMore_1.default, null) },
            react_1.default.createElement(Typography_1.default, null, header)),
        children);
};
