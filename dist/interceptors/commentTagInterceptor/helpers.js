"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comment_components_1 = require("./comment-components");
var helpersInternal_1 = require("./helpersInternal");
var createComponentProvider_1 = require("./createComponentProvider");
// todo - resolve <T extends {[key:string]:React.CSSProperties}>
function generateStylePropAwareComponents(componentDetails, span) {
    if (span === void 0) { span = true; }
    return helpersInternal_1.generateStylePropAwareComponentsInternal(componentDetails, span, false, false);
}
exports.generateStylePropAwareComponents = generateStylePropAwareComponents;
exports.builtInComponentProvider = createComponentProvider_1.createComponentProvider(comment_components_1.commentComponents);
exports.builtInComponentFinder = createComponentProvider_1.createComponentFinder(comment_components_1.commentComponents);
//# sourceMappingURL=helpers.js.map