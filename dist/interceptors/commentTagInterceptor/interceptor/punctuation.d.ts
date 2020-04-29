import { RenderNode, ElementNode } from "react-syntax-highlighter-renderer-interceptor";
export declare function nodeIsPunctation(node: RenderNode): node is ElementNode;
export declare function getPunctuation(punctuationNode: ElementNode): string;
