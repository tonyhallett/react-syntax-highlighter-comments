import { ElementNode, RenderNode } from "react-syntax-highlighter-renderer-interceptor";
export declare enum TagType {
    Start = 0,
    End = 1,
    SelfClosing = 2
}
export declare function nodeIsTagClassName(node: RenderNode): node is ElementNode;
export declare function getTagDetails(node: ElementNode): {
    tagName: string;
    tagType: TagType;
} | undefined;
