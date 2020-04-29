/// <reference types="react" />
import { CommentLinkMatch } from "./commentLinkInterceptorCreator";
import { ElementNode } from "react-syntax-highlighter-renderer-interceptor";
export declare function createLinksAndComments(commentLinkMatch: CommentLinkMatch): ElementNode[];
export declare function createLinkNode(href: string, style: React.CSSProperties | undefined, text: string | undefined, props: any, type: any): ElementNode;
