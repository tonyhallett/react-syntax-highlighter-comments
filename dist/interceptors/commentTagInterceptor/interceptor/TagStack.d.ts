import * as React from "react";
import { RenderNode, ElementNode, NodeRenderDetails } from "react-syntax-highlighter-renderer-interceptor";
export declare function nodeIsPlainText(node: RenderNode): node is ElementNode;
export declare class TagStack {
    private stack;
    private rootKey;
    private originalNodes;
    private isNextSibling;
    private pushOriginalNodes;
    private ignoreComponentTypeWhenNoStack;
    private ensureNoDoubleChildren;
    private ensureNoDoubleChildrenOnNode;
    private getLastEntry;
    processStart(nodeRenderDetails: NodeRenderDetails, componentType: React.ComponentType | string, tagName: string, properties: ElementNode['properties']): NodeRenderDetails | undefined;
    processNonTagNode(nodeRenderDetails: NodeRenderDetails): NodeRenderDetails | undefined;
    processSelfClosing(nodeRenderDetails: NodeRenderDetails, componentType: React.ComponentType | string, properties: ElementNode['properties']): NodeRenderDetails | undefined;
    processEnd(nodeRenderDetails: NodeRenderDetails, tagName: string): NodeRenderDetails | undefined;
    private cleanUp;
    bail(nodeRenderDetails: NodeRenderDetails): NodeRenderDetails | undefined;
    nodeProcessed(node: RenderNode): boolean;
}
