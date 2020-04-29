import { ElementNode, TextNode, RenderNode } from "react-syntax-highlighter-renderer-interceptor";
export declare function isCommentNode(renderNode: RenderNode): renderNode is ElementNode;
export declare function getCommentTextNode(node: RenderNode): TextNode;
export declare function createCommentNode(comment: string): ElementNode;
