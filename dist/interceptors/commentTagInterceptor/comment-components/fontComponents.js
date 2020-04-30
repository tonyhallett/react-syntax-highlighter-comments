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
var helpersInternal_1 = require("../helpersInternal");
var textDecorationStyles_1 = require("./textDecorationStyles");
var fontStyles = __assign({ 'Italic': {
        fontStyle: 'italic'
    }, 'Oblique': {
        fontStyle: 'oblique'
    }, 'Lighter': {
        fontWeight: 'lighter'
    }, 'Bold': {
        fontWeight: 'bold'
    }, 'Bolder': {
        fontWeight: 'bolder'
    }, 
    //could fw100 etc
    'XXSmall': {
        fontSize: 'xx-small'
    }, 'XSmall': {
        fontSize: 'x-small'
    }, 'Small': {
        fontSize: 'small'
    }, 'Medium': {
        fontSize: 'medium'
    }, 'Large': {
        fontSize: 'large'
    }, 'XLarge': {
        fontSize: 'x-large'
    }, 'XXLarge': {
        fontSize: 'xx-large'
    }, 'XXXLarge': {
        fontSize: 'xxx-large'
    }, 'Smaller': {
        fontSize: 'smaller'
    }, 'Larger': {
        fontSize: 'larger'
    } }, textDecorationStyles_1.textDecorationStyles);
exports.FontComponents = helpersInternal_1.generateStylePropAwareComponentsInternal(fontStyles);
var lineThrough = 'line-through';
var overline = 'overline';
var underline = 'underline';
function getTextDecorationLine(shortline) {
    switch (shortline) {
        case 'none':
            return 'none';
        case 'lt':
            return lineThrough;
        case 'ol':
            return overline;
        case 'ul':
            return underline;
        case 'ollt':
            return overline + " " + lineThrough;
        case 'ullt':
            return underline + " " + lineThrough;
        case 'ulol':
            return underline + " " + overline;
        case 'all':
            return underline + " " + overline + " " + lineThrough;
    }
}
exports.TextDecoration = function (_a) {
    var commentDisplay = _a.commentDisplay, children = _a.children, commentStyleProp = _a.commentStyleProp, respectStyleProp = _a.respectStyleProp, th = _a.th, s = _a.s, _b = _a.l, l = _b === void 0 ? 'ul' : _b, _c = _a.isSpan, isSpan = _c === void 0 ? true : _c, c = _a.c;
    if (commentDisplay) {
        var baseStyle = respectStyleProp && commentStyleProp ? commentStyleProp : {};
        var componentStyle = {
            textDecorationStyle: s,
            textDecorationLine: getTextDecorationLine(l),
            textDecorationColor: c,
            textDecorationThickness: th
        };
        var actualStyle = __assign(__assign({}, baseStyle), componentStyle);
        if (isSpan) {
            return React.createElement("span", { style: actualStyle }, children ? children : '');
        }
        return React.createElement("div", { style: actualStyle }, children ? children : '');
    }
    return null;
};
exports.TextDecoration.displayName = 'TextDecoration';
//# sourceMappingURL=fontComponents.js.map