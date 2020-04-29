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
function generateStylePropAwareComponentsInternal(componentDetails, span, acceptsMergeStyle) {
    if (span === void 0) { span = true; }
    if (acceptsMergeStyle === void 0) { acceptsMergeStyle = true; }
    var components = {};
    Object.keys(componentDetails).forEach(function (componentName) {
        var componentStyle = componentDetails[componentName];
        var Component = function (_a) {
            var display = _a.commentDisplay, children = _a.children, commentStyle = _a.commentStyleProp, respectStyleProp = _a.respectStyleProp, mergeStyle = _a.mergeStyle;
            if (display) {
                var baseStyle = respectStyleProp && commentStyle ? commentStyle : {};
                var actualStyle = __assign(__assign(__assign({}, baseStyle), componentStyle), mergeStyle);
                if (span) {
                    return React.createElement("span", { style: actualStyle }, children ? children : '');
                }
                return React.createElement("div", { style: actualStyle }, children ? children : '');
            }
            return null;
        };
        Component.displayName = componentName;
        if (acceptsMergeStyle) {
            Component.acceptsMergeStyle = true;
        }
        components[componentName] = Component;
    });
    return components;
}
exports.generateStylePropAwareComponentsInternal = generateStylePropAwareComponentsInternal;
//# sourceMappingURL=helpersInternal.js.map