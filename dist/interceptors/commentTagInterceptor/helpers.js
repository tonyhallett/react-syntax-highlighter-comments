"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comment_components_1 = require("./comment-components");
var helpersInternal_1 = require("./helpersInternal");
// todo - resolve <T extends {[key:string]:React.CSSProperties}>
function generateStylePropAwareComponents(componentDetails, span) {
    if (span === void 0) { span = true; }
    return helpersInternal_1.generateStylePropAwareComponentsInternal(componentDetails, span, false);
}
exports.generateStylePropAwareComponents = generateStylePropAwareComponents;
exports.builtInComponentProvider = function (tagName) {
    return exports.builtInComponentFinder(tagName);
};
exports.builtInComponentFinder = function (tagName) { return comment_components_1.commentComponents.find(function (ct) { return ct.displayName === tagName; }); };
//# sourceMappingURL=helpers.js.map