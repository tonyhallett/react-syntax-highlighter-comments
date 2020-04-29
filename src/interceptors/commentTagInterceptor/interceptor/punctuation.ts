import { RenderNode, ElementNode, TextNode } from "react-syntax-highlighter-renderer-interceptor";

export function nodeIsPunctation(node:RenderNode):node is ElementNode{
  return node.type==='element' && node.properties.className.indexOf('punctuation')!==-1;
}
export function getPunctuation(punctuationNode:ElementNode){
  return (punctuationNode.children[0] as TextNode).value; 
}