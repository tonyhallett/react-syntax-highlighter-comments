import { RenderNode, ElementNode } from "react-syntax-highlighter-renderer-interceptor";

export function nodeIsTag(node:RenderNode):node is ElementNode{
  return node.type==='element'&&node.properties.className.indexOf('tag')!==-1;
}