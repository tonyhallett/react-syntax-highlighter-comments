"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colorNames_1 = require("../helpers/colorNames");
function createColorStyle() {
    var options = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        options[_i] = arguments[_i];
    }
    var colorStyle = {};
    colorNames_1.colorNames.forEach(function (cn) {
        var colorName = cn[0].toLowerCase();
        options.forEach(function (option) {
            var _a;
            colorStyle[option.keyPrefix + colorName] = (_a = {},
                _a[option.colorProperty] = cn[1],
                _a);
        });
    });
    return colorStyle;
}
exports.createColorStyle = createColorStyle;
exports.colorStyle = createColorStyle({ keyPrefix: 'color-', colorProperty: 'color' }, { keyPrefix: 'bgcolor-', colorProperty: 'backgroundColor' });
//# sourceMappingURL=colourStyle.js.map