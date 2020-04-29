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
exports.Comment = function (_a) {
    var display = _a.commentDisplay, children = _a.children, commentStyle = _a.commentStyleProp, respectStyleProp = _a.respectStyleProp;
    if (display) {
        return React.createElement(React.Fragment, null,
            React.createElement("span", { style: respectStyleProp ? commentStyle : {} }, "// "),
            children);
    }
    return null;
};
exports.Comment.displayName = 'Comment';
//# sourceMappingURL=Comment.js.map