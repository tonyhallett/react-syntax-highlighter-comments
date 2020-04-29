import { StyleCreator, NodeRenderInterceptor, NodeRenderDetails, ElementNode, Stylesheet } from "react-syntax-highlighter-renderer-interceptor";
export declare function createCommentStyleCreator(styleCreator: StyleCreator): StyleCreator;
export interface CommentNodeRenderDetails {
    key: string;
    node: ElementNode;
    stylesheet: Stylesheet;
    useInlineStyles: boolean;
}
export interface CommentRenderInterceptor {
    (nodeRenderDetails: CommentNodeRenderDetails): NodeRenderDetails | undefined;
}
export declare function createCommentNodeRenderInterceptor(nodeRenderInterceptor: CommentRenderInterceptor, firstNodeReset?: () => void): NodeRenderInterceptor;
