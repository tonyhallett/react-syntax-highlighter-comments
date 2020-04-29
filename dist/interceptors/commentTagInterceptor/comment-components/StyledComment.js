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
var common_1 = require("./common");
exports.StyledComment = function (_a) {
    var display = _a.commentDisplay, comment = _a.comment, style = _a.style, _b = _a.tab, tab = _b === void 0 ? 0 : _b, children = _a.children, commentStyle = _a.commentStyleProp, respectStyleProp = _a.respectStyleProp;
    var commentStringOrArray = comment ? comment : children;
    var spacing = common_1.getSpacing(tab);
    var commentSpacing = "   " + spacing;
    if (display) {
        var baseStyle = respectStyleProp && commentStyle ? commentStyle : {};
        var mergedStyle_1 = __assign(__assign({}, baseStyle), style);
        // for now not styling the comments differently
        if (Array.isArray(commentStringOrArray)) {
            if (commentStringOrArray.length > 0) {
                return React.createElement(React.Fragment, null,
                    React.createElement("span", { style: mergedStyle_1 }, "/*"),
                    commentStringOrArray.map(function (line, i) {
                        return React.createElement("div", { key: i },
                            React.createElement("span", null, commentSpacing),
                            React.createElement("span", { style: mergedStyle_1 }, line));
                    }),
                    React.createElement("div", null,
                        React.createElement("span", null, spacing),
                        React.createElement("span", { style: mergedStyle_1 }, "*/")));
            }
            return null;
        }
        else {
            return React.createElement("span", { style: mergedStyle_1 }, "// " + commentStringOrArray);
        }
    }
    return null;
};
exports.StyledComment.displayName = 'StyledComment';
//# sourceMappingURL=StyledComment.js.map