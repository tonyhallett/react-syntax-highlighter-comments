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
Object.defineProperty(exports, "__esModule", { value: true });
var helpersInternal_1 = require("../helpersInternal");
var textDecorationComponents_1 = require("./textDecorationComponents");
var textDecorationComponents_2 = require("./textDecorationComponents");
exports.TextDecoration = textDecorationComponents_2.TextDecoration;
var fontStyles = {
    'Italic': {
        fontStyle: 'italic'
    },
    'Oblique': {
        fontStyle: 'oblique'
    },
    'Lighter': {
        fontWeight: 'lighter'
    },
    'Bold': {
        fontWeight: 'bold'
    },
    'Bolder': {
        fontWeight: 'bolder'
    },
    //could fw100 etc
    'XXSmall': {
        fontSize: 'xx-small'
    },
    'XSmall': {
        fontSize: 'x-small'
    },
    'Small': {
        fontSize: 'small'
    },
    'Medium': {
        fontSize: 'medium'
    },
    'Large': {
        fontSize: 'large'
    },
    'XLarge': {
        fontSize: 'x-large'
    },
    'XXLarge': {
        fontSize: 'xx-large'
    },
    'XXXLarge': {
        fontSize: 'xxx-large'
    },
    'Smaller': {
        fontSize: 'smaller'
    },
    'Larger': {
        fontSize: 'larger'
    },
};
exports.FontComponents = __assign(__assign({}, helpersInternal_1.generateStylePropAwareComponentsInternal(fontStyles)), textDecorationComponents_1.TextDecorationComponents);
//# sourceMappingURL=fontComponents.js.map