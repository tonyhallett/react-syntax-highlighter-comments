"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpersInternal_1 = require("../helpersInternal");
var textDecorationCommon_1 = require("./textDecorationCommon");
function generateTextDecorationComponents(first, second, third) {
    var textDecorationStyles = {};
    function getComponentNameAndValue(valueName) {
        var componentName = valueName ? valueName.componentName : '';
        var value = valueName ? valueName.value : undefined;
        return {
            value: value, componentName: componentName
        };
    }
    first.valueNames.forEach(function (firstValueName) {
        var _a = getComponentNameAndValue(firstValueName), firstComponentName = _a.componentName, firstPropValue = _a.value;
        second.valueNames.forEach(function (secondValueName) {
            var _a = getComponentNameAndValue(secondValueName), secondComponentName = _a.componentName, secondPropValue = _a.value;
            third.valueNames.forEach(function (thirdValueName) {
                var _a = getComponentNameAndValue(thirdValueName), thirdComponentName = _a.componentName, thirdPropValue = _a.value;
                var componentStyles = {};
                textDecorationStyles["" + firstComponentName + secondComponentName + thirdComponentName] = componentStyles;
                componentStyles[third.prop] = thirdPropValue;
                componentStyles[second.prop] = secondPropValue;
                componentStyles[first.prop] = firstPropValue;
            });
        });
    });
    return helpersInternal_1.generateStylePropAwareComponentsInternal(textDecorationStyles);
}
exports.TextDecorationComponents = generateTextDecorationComponents(textDecorationCommon_1.lineGeneration, textDecorationCommon_1.styleGeneration, textDecorationCommon_1.getColorGeneration());
//# sourceMappingURL=textDecorationGeneration.js.map