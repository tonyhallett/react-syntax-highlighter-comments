import { createCommentLinkInterceptor } from "./commentLinkInterceptorCreator";
import { createMdLinkLinkMatcher, LinkTarget } from "./createMdLinkLinkMatcher";
export {LinkTarget}
export function createTargetedCommentLinkInterceptor(target:LinkTarget){
  return createCommentLinkInterceptor(createMdLinkLinkMatcher(target));
}
export const commentLinkInterceptorTargetSelf = createTargetedCommentLinkInterceptor('_self');
export const commentLinkInterceptorTargetBlank = createTargetedCommentLinkInterceptor('_blank');
