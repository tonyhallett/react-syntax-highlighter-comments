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
var ComponentType;
(function (ComponentType) {
    ComponentType[ComponentType["Html"] = 0] = "Html";
    ComponentType[ComponentType["ReactFragment"] = 1] = "ReactFragment";
    ComponentType[ComponentType["Component"] = 2] = "Component";
})(ComponentType = exports.ComponentType || (exports.ComponentType = {}));
function isHtmlElementTagName(tagName) {
    return tagName[0] !== tagName[0].toUpperCase();
}
exports.isHtmlElementTagName = isHtmlElementTagName;
function getComponentDetails(tagName, componentProvider) {
    var componentTypeDetails;
    var type = ComponentType.Html;
    var isHtmlElement = isHtmlElementTagName(tagName);
    if (isHtmlElement) {
        componentTypeDetails = tagName;
    }
    else {
        if (tagName === 'Fragment' || tagName === 'React.Fragment') {
            componentTypeDetails = React.Fragment;
            type = ComponentType.ReactFragment;
        }
        else {
            componentTypeDetails = componentProvider(tagName);
            type = ComponentType.Component;
        }
    }
    return { componentTypeDetails: componentTypeDetails, type: type };
}
exports.getComponentDetails = getComponentDetails;
//# sourceMappingURL=getComponentDetails.js.map