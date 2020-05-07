"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colorNames_1 = require("../../../helpers/colorNames");
function getColorGeneration() {
    var valueNames = Object.keys(colorNames_1.colorNamesObject).map(function (cn) {
        return {
            componentName: cn,
            value: cn.toLowerCase()
        };
    });
    valueNames.push(undefined);
    return {
        prop: 'textDecorationColor',
        valueNames: valueNames
    };
}
exports.getColorGeneration = getColorGeneration;
exports.styleGeneration = {
    prop: 'textDecorationStyle',
    valueNames: [
        { value: 'double', componentName: 'Double' },
        { value: 'dotted', componentName: 'Dotted' },
        { value: 'dashed', componentName: 'Dashed' },
        { value: 'wavy', componentName: 'Wavy' },
        undefined //not specifying the default solid
    ]
};
exports.lineGeneration = {
    prop: 'textDecorationLine',
    valueNames: [
        { value: 'underline', componentName: 'Ul' },
        { value: 'overline', componentName: 'Ol' },
        { value: 'line-through', componentName: 'Lt' },
        { value: 'underline overline', componentName: 'UlOl' },
        { value: 'underline line-through', componentName: 'UlLt' },
        { value: 'overline line-through', componentName: 'OlLt' },
        { value: 'underline overline line-through', componentName: 'UlOlLt' }
    ]
};
//# sourceMappingURL=textDecorationCommon.js.map