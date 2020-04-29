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
var colourStyle_1 = require("./colourStyle");
exports.fontStyle = __assign({ 'italic': {
        fontStyle: 'italic'
    }, 'oblique': {
        fontStyle: 'oblique'
    }, 'lighter': {
        fontWeight: 'lighter'
    }, 'bold': {
        fontWeight: 'bold'
    }, 'bolder': {
        fontWeight: 'bolder'
    }, 
    //could fw100 etc
    'xx-small': {
        fontSize: 'xx-small'
    }, 'x-small': {
        fontSize: 'x-small'
    }, 'small': {
        fontSize: 'small'
    }, 'medium': {
        fontSize: 'medium'
    }, 'large': {
        fontSize: 'large'
    }, 'x-large': {
        fontSize: 'x-large'
    }, 'xx-large': {
        fontSize: 'xx-large'
    }, 'xxx-large': {
        fontSize: 'xxx-large'
    }, 'smaller': {
        fontSize: 'smaller'
    }, 'larger': {
        fontSize: 'larger'
    }, 
    //could add % sizes
    //https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration
    'td-underline': {
        textDecorationLine: 'underline'
    }, 'td-overline': {
        textDecorationLine: 'overline'
    }, 'td-line-through': {
        textDecorationLine: 'line-through'
    }, 'td-underline-overline': {
        textDecorationLine: 'underline overline'
    }, 'td-underline-line-through': {
        textDecorationLine: 'underline line-through'
    }, 'td-overline-line-through': {
        textDecorationLine: 'overline line-through'
    }, 'td-underline-overline-line-through': {
        textDecorationLine: 'underline overline line-through'
    }, 'td-double': {
        textDecorationStyle: 'double'
    }, 'td-dotted': {
        textDecorationStyle: 'dotted'
    }, 'td-dashed': {
        textDecorationStyle: 'dashed'
    }, 'td-wavy': {
        textDecorationStyle: 'wavy'
    } }, colourStyle_1.createColorStyle({ keyPrefix: 'td-color-', colorProperty: 'textDecorationColor' })
//https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch
);
//# sourceMappingURL=fontStyle.js.map