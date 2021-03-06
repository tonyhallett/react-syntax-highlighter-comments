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
var colorNames_1 = require("../../../helpers/colorNames");
exports.Coloured = function (_a) {
    var commentDisplay = _a.commentDisplay, color = _a.color, children = _a.children, commentStyleProp = _a.commentStyleProp, respectStyleProp = _a.respectStyleProp, style = _a.style;
    if (commentDisplay) {
        var baseStyle = respectStyleProp && commentStyleProp ? commentStyleProp : {};
        var actualStyle = __assign(__assign({}, baseStyle), style);
        actualStyle.color = color;
        if (typeof children !== 'string') {
            var childrenWithColor = React.Children.map(children, function (c) {
                var child = c;
                if (child && child.type.acceptsMergeStyle) {
                    return React.cloneElement(child, { mergeStyle: __assign(__assign({}, style), { color: color }) });
                }
                return c;
            });
            return React.createElement("span", { style: actualStyle }, childrenWithColor);
        }
        return React.createElement("span", { style: actualStyle }, children ? children : '');
    }
    return null;
};
exports.Coloured.displayName = 'Coloured';
exports.ColorNameComponents = {};
Object.keys(colorNames_1.colorNamesObject).forEach(function (colorName) {
    var Component = function (props) {
        return React.createElement(exports.Coloured, __assign({}, props, { color: colorNames_1.colorNamesObject[colorName] }), props.children);
    };
    Component.displayName = colorName;
    exports.ColorNameComponents[colorName] = Component;
});
//# sourceMappingURL=Coloured.js.map