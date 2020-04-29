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
var StyledComment_1 = require("./StyledComment");
exports.RedComment = function (_a) {
    var display = _a.commentDisplay, comment = _a.comment, children = _a.children, tab = _a.tab, respectStyleProp = _a.respectStyleProp, commentStyle = _a.commentStyleProp;
    var redComment = comment ? comment : children;
    if (display && redComment) {
        return React.createElement(StyledComment_1.StyledComment, { commentDisplay: true, respectStyleProp: respectStyleProp, commentStyleProp: commentStyle, comment: redComment, tab: tab, style: { color: 'red' } });
    }
    return null;
};
exports.RedComment.displayName = 'RedComment';
//# sourceMappingURL=RedComment.js.map