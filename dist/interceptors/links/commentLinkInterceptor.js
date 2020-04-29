"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commentLinkInterceptorCreator_1 = require("./commentLinkInterceptorCreator");
var createMdLinkLinkMatcher_1 = require("./createMdLinkLinkMatcher");
function createTargetedCommentLinkInterceptor(target) {
    return commentLinkInterceptorCreator_1.createCommentLinkInterceptor(createMdLinkLinkMatcher_1.createMdLinkLinkMatcher(target));
}
exports.createTargetedCommentLinkInterceptor = createTargetedCommentLinkInterceptor;
exports.commentLinkInterceptorTargetSelf = createTargetedCommentLinkInterceptor('_self');
exports.commentLinkInterceptorTargetBlank = createTargetedCommentLinkInterceptor('_blank');
//# sourceMappingURL=commentLinkInterceptor.js.map