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
function generateStylePropAwareComponentsInternal(componentDetails, span, acceptsMergeStyle, mergeStyleToChildren) {
    if (span === void 0) { span = true; }
    if (acceptsMergeStyle === void 0) { acceptsMergeStyle = true; }
    if (mergeStyleToChildren === void 0) { mergeStyleToChildren = true; }
    var components = {};
    Object.keys(componentDetails).forEach(function (componentName) {
        var componentStyle = componentDetails[componentName];
        var Component = function (_a) {
            var commentDisplay = _a.commentDisplay, children = _a.children, commentStyleProp = _a.commentStyleProp, respectStyleProp = _a.respectStyleProp, mergeStyle = _a.mergeStyle, // as used by Coloured and ColourNameComponents
            style = _a.style // to more likely be supplied by the ComponentProvider
            ;
            if (commentDisplay) {
                if (!acceptsMergeStyle) {
                    mergeStyle = {};
                }
                var baseStyle = respectStyleProp && commentStyleProp ? commentStyleProp : {};
                var actualStyle = __assign(__assign(__assign(__assign({}, baseStyle), mergeStyle), style), componentStyle);
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