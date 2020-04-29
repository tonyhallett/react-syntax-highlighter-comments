import * as React from "react";
import { RenderNode, ElementNode, TextNode, NodeRenderDetails, keyIsNextSibling } from "react-syntax-highlighter-renderer-interceptor";

export function nodeIsPlainText(node:RenderNode):node is ElementNode{
  return node.type==='element'&&node.properties.className.indexOf('plain-text')!==-1;
}
export class TagStack {
  private stack: Array<{
    componentType: React.ComponentType | string;
    properties: ElementNode['properties'];
    tagName?: string;
    children: RenderNode[];
  }> = [];
  private rootKey: string | undefined;
  private originalNodes: RenderNode[] = [];
  private isNextSibling(key: string): boolean {
    if (keyIsNextSibling(this.rootKey!, key)) {
      this.rootKey = key;
      return true;
    }
    return false;
  }
  private pushOriginalNodes(nodeRenderDetails: NodeRenderDetails) {
    (nodeRenderDetails.node as any).tagProcessed = true;
    if (this.rootKey === undefined) {
      this.rootKey = nodeRenderDetails.key;
      this.originalNodes.push(nodeRenderDetails.node);
    }
    else {
      if (this.isNextSibling(nodeRenderDetails.key)) {
        this.originalNodes.push(nodeRenderDetails.node);
      }
    }
  }
  private ignoreComponentTypeWhenNoStack(componentType: React.ComponentType | string): boolean {
    if (this.stack.length === 0 && (componentType === React.Fragment || typeof componentType === 'string')) {
      return true;
    }
    return false;
  }
  private ensureNoDoubleChildren(nodeRenderDetails: NodeRenderDetails): NodeRenderDetails {
    const node = nodeRenderDetails.node;
    this.ensureNoDoubleChildrenOnNode(node as ElementNode);
    return nodeRenderDetails;
  }
  private ensureNoDoubleChildrenOnNode(node: ElementNode) {
    if (node.properties.children !== undefined && node.children.length > 0) {
      delete node.properties.children;
    }
    node.children.forEach(n => {
      this.ensureNoDoubleChildrenOnNode(n as ElementNode);
    });
  }
  private getLastEntry() {
    return this.stack[this.stack.length - 1];
  }
  processStart(nodeRenderDetails: NodeRenderDetails, componentType: React.ComponentType | string, tagName: string, properties: ElementNode['properties']): NodeRenderDetails | undefined {
    if (this.ignoreComponentTypeWhenNoStack(componentType)) {
      return nodeRenderDetails;
    }
    this.stack.push({ componentType, tagName, properties, children: [] });
    this.pushOriginalNodes(nodeRenderDetails);
    return undefined;
  }
  processNonTagNode(nodeRenderDetails: NodeRenderDetails): NodeRenderDetails | undefined {
    if (this.stack.length > 0) {
      const node = nodeRenderDetails.node;
      if (nodeIsPlainText(node)) {
        const childText = (node.children[0] as TextNode).value;
        const lastEntry = this.stack[this.stack.length - 1];
        lastEntry.properties.children = childText;
        this.pushOriginalNodes(nodeRenderDetails);
        return undefined;
      }
      return this.bail(nodeRenderDetails);
    }
    else {
      return nodeRenderDetails;
    }
  }
  processSelfClosing(nodeRenderDetails: NodeRenderDetails, componentType: React.ComponentType | string, properties: ElementNode['properties']): NodeRenderDetails | undefined {
    if (this.ignoreComponentTypeWhenNoStack(componentType)) {
      return nodeRenderDetails;
    }
    const node: ElementNode = { type: 'element', tagName: componentType, properties, children: [] };
    if (this.stack.length > 0) {
      const entry = this.getLastEntry();
      entry.children.push(node);
      this.pushOriginalNodes(nodeRenderDetails);
      return undefined;
    }
    else {
      return {
        useInlineStyles: nodeRenderDetails.useInlineStyles,
        stylesheet: nodeRenderDetails.stylesheet,
        key: nodeRenderDetails.key,
        node
      };
    }
  }
  processEnd(nodeRenderDetails: NodeRenderDetails, tagName: string): NodeRenderDetails | undefined {
    if (this.stack.length > 0) {
      let lastEntry = this.getLastEntry();
      if (lastEntry.tagName === tagName) {
        lastEntry = this.stack.pop()!;
        const node: ElementNode = {
          type: 'element',
          properties: lastEntry.properties,
          tagName: lastEntry.componentType,
          children: lastEntry!.children
        };
        if (this.stack.length === 0) {
          this.cleanUp();
          return this.ensureNoDoubleChildren({
            key: nodeRenderDetails.key,
            stylesheet: nodeRenderDetails.stylesheet,
            useInlineStyles: nodeRenderDetails.useInlineStyles,
            node
          });
        }
        else {
          const lastEntry = this.getLastEntry();
          lastEntry.children.push(node);
          this.pushOriginalNodes(nodeRenderDetails);
          return undefined;
        }
      }
      else {
        return this.bail(nodeRenderDetails);
      }
    }
    this.cleanUp();
    return nodeRenderDetails;
  }
  private cleanUp() {
    this.originalNodes = [];
    this.stack = [];
    this.rootKey = undefined;
  }
  bail(nodeRenderDetails: NodeRenderDetails): NodeRenderDetails | undefined {
    if (this.stack.length > 0) {
      this.pushOriginalNodes(nodeRenderDetails);
      const wrapNode: ElementNode = {
        type: 'element',
        tagName: React.Fragment,
        children: this.originalNodes,
        properties: { className: [] }
      };
      const bailed: NodeRenderDetails = {
        key: nodeRenderDetails.key,
        stylesheet: nodeRenderDetails.stylesheet,
        useInlineStyles: nodeRenderDetails.useInlineStyles,
        node: wrapNode
      };
      this.cleanUp();
      return bailed;
    }
    this.cleanUp();
    return nodeRenderDetails;
  }
  nodeProcessed(node: RenderNode): boolean {
    return !!node.tagProcessed;
  }
}
