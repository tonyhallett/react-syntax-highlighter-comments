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
var colorNames_1 = require("../../../helpers/colorNames");
exports.Coloured = function (_a) {
    var display = _a.commentDisplay, color = _a.color, children = _a.children, commentStyle = _a.commentStyleProp, respectStyleProp = _a.respectStyleProp;
    if (display) {
        var childrenType = typeof children;
        if (childrenType !== 'string') {
            var childrenWithColor = React.Children.map(children, function (c) {
                var child = c;
                if (child && child.type.acceptsMergeStyle) {
                    return React.cloneElement(child, { mergeStyle: { color: color } });
                }
                return c;
            });
            return React.createElement(React.Fragment, null, childrenWithColor);
        }
        var baseStyle = respectStyleProp && commentStyle ? commentStyle : {};
        baseStyle.color = color;
        return React.createElement("span", { style: baseStyle }, children ? children : '');
    }
    return null;
};
exports.Coloured.displayName = 'Coloured';
exports.ColorNameComponents = {};
Object.keys(colorNames_1.colorNamesObject).forEach(function (colorName) {
    var Component = function (_a) {
        var display = _a.commentDisplay, children = _a.children, commentStyle = _a.commentStyleProp, respectStyleProp = _a.respectStyleProp;
        return React.createElement(exports.Coloured, { commentDisplay: display, commentStyleProp: commentStyle, respectStyleProp: respectStyleProp, color: colorNames_1.colorNamesObject[colorName] }, children);
    };
    Component.displayName = colorName;
    exports.ColorNameComponents[colorName] = Component;
});
//# sourceMappingURL=Coloured.js.map