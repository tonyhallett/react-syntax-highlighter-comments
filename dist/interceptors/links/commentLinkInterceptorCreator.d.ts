/// <reference types="react" />
import { NodeRenderInterceptor } from "react-syntax-highlighter-renderer-interceptor";
export interface LinkDetails {
    url: string;
    linkText?: string;
    linkType?: any;
    linkProps?: any;
    linkStyle?: React.CSSProperties;
}
export declare type CommentLinkMatch = Array<string | LinkDetails>;
export interface CommentLinkMatcher {
    (comment: string): CommentLinkMatch | undefined;
}
export declare function createCommentLinkInterceptor(commentLinkMatcher: CommentLinkMatcher): NodeRenderInterceptor;
