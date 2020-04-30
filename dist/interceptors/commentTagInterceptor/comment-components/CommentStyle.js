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
exports.CommentStyle = function (_a) {
    var commentDisplay = _a.commentDisplay, children = _a.children, commentStyleProp = _a.commentStyleProp;
    if (commentDisplay) {
        return React.createElement("span", { style: commentStyleProp }, children);
    }
    return null;
};
exports.CommentStyle.displayName = 'CommentStyle';
//# sourceMappingURL=CommentStyle.js.map