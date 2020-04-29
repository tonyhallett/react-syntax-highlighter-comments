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
var common_1 = require("./common");
exports.MultiComment = function (_a) {
    var display = _a.commentDisplay, children = _a.children, _b = _a.tab, tab = _b === void 0 ? 0 : _b, commentStyle = _a.commentStyleProp, respectStyleProp = _a.respectStyleProp;
    if (display && Array.isArray(children)) {
        var spacing = common_1.getSpacing(tab);
        var commentSpacing_1 = "   " + spacing;
        var style = respectStyleProp && commentStyle ? commentStyle : {};
        return React.createElement(React.Fragment, null,
            React.createElement("span", { style: style }, "/*"),
            children && children.map(function (c, i) { return React.createElement("div", { key: i },
                React.createElement("span", null, commentSpacing_1),
                c); }),
            React.createElement("div", null,
                React.createElement("span", null, spacing),
                React.createElement("span", { style: style }, "*/")));
    }
    return null;
};
exports.MultiComment.displayName = 'MultiComment';
//# sourceMappingURL=MultiComment.js.map