"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../common");
var isFirstNode_1 = require("./isFirstNode");
function createCommentStyleCreator(styleCreator) {
    var commentStyleCreator = function (currentStyle, className, node) {
        if (common_1.isCommentNode(node)) {
            return styleCreator(currentStyle, className, node);
        }
        return currentStyle;
    };
    return commentStyleCreator;
}
exports.createCommentStyleCreator = createCommentStyleCreator;
function createCommentNodeRenderInterceptor(nodeRenderInterceptor, firstNodeReset) {
    var commentNodeRenderInterceptor = function (nodeRenderDetails) {
        if (firstNodeReset && isFirstNode_1.isFirstNode(nodeRenderDetails)) {
            firstNodeReset();
        }
        if (common_1.isCommentNode(nodeRenderDetails.node)) {
            return nodeRenderInterceptor(nodeRenderDetails);
        }
        return nodeRenderDetails;
    };
    return commentNodeRenderInterceptor;
}
exports.createCommentNodeRenderInterceptor = createCommentNodeRenderInterceptor;
//# sourceMappingURL=commentHofs.js.map