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
    var commentDisplay = _a.commentDisplay, comment = _a.comment, children = _a.children, tab = _a.tab, respectStyleProp = _a.respectStyleProp, commentStyleProp = _a.commentStyleProp, _b = _a.style, style = _b === void 0 ? {} : _b;
    var redComment = comment ? comment : children;
    if (commentDisplay && redComment) {
        style.color = 'red';
        return React.createElement(StyledComment_1.StyledComment, { commentDisplay: true, respectStyleProp: respectStyleProp, commentStyleProp: commentStyleProp, comment: redComment, tab: tab, style: style });
    }
    return null;
};
exports.RedComment.displayName = 'RedComment';
//# sourceMappingURL=RedComment.js.map