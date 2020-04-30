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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var htmlElements = ['span', 'div'];
function wrapComponent(htmlElement) {
    var Component = function (_a) {
        var commentDisplay = _a.commentDisplay, children = _a.children, commentStyleProp = _a.commentStyleProp, respectStyleProp = _a.respectStyleProp, other = __rest(_a, ["commentDisplay", "children", "commentStyleProp", "respectStyleProp"]);
        if (commentDisplay) {
            var baseStyle = respectStyleProp && commentStyleProp ? commentStyleProp : {};
            var originalStyle = other.style;
            var _b = other, mergeStyle = _b.mergeStyle, otherProps = _b.otherProps;
            var actualStyle = __assign(__assign(__assign({}, baseStyle), mergeStyle), originalStyle);
            return React.createElement(htmlElement, __assign(__assign({}, otherProps), { style: actualStyle }), children);
        }
        return null;
    };
    var capitalizedName = htmlElement.substr(0, 1).toUpperCase() + htmlElement.substr(1);
    Component.displayName = capitalizedName;
    Component.acceptsMergeStyle = true;
    return Component;
}
exports.HtmlComponents = {};
htmlElements.reduce(function (prev, value) {
    prev[value] = wrapComponent(value);
    return prev;
}, exports.HtmlComponents);
//# sourceMappingURL=htmlComponents.js.map