"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
function isComponentTypeWithProps(componentTypeDetails) {
    return componentTypeDetails.additionalProps !== undefined;
}
exports.isComponentTypeWithProps = isComponentTypeWithProps;
function extractComponentTypeDetails(componentTypeDetails) {
    var componentType;
    var additionalProps = {};
    var propsPrecedence = types_1.PropsPrecedence.Instance;
    var mergeObjectProps = true;
    if (isComponentTypeWithProps(componentTypeDetails)) {
        componentType = componentTypeDetails.type;
        additionalProps = componentTypeDetails.additionalProps;
        if (componentTypeDetails.propsPrecedence !== undefined) {
            propsPrecedence = componentTypeDetails.propsPrecedence;
        }
        if (componentTypeDetails.mergeObjectProps !== undefined) {
            mergeObjectProps = componentTypeDetails.mergeObjectProps;
        }
    }
    else {
        componentType = componentTypeDetails;
    }
    return {
        componentType: componentType,
        additionalProps: additionalProps,
        propsPrecedence: propsPrecedence,
        mergeObjectProps: mergeObjectProps
    };
}
exports.extractComponentTypeDetails = extractComponentTypeDetails;
//# sourceMappingURL=extractComponentTypeDetails.js.map