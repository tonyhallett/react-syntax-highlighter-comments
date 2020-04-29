import { ElementNode, TextNode, RenderNode } from "react-syntax-highlighter-renderer-interceptor";
import { isVoidElement } from "./isVoidElement";
import { nodeIsTag } from "./nodeHelpers";
import { nodeIsPunctation, getPunctuation } from "./punctuation";

export enum TagType {Start, End, SelfClosing};

export function nodeIsTagClassName(node:RenderNode):node is ElementNode{
  return node.type==='element' && node.properties.className.indexOf('class-name')!==-1;
}
export function getTagDetails(node: ElementNode): {
  tagName: string;
  tagType: TagType;
} | undefined {
  const firstChild = node.children[0];
  if (nodeIsTag(firstChild)) {
    let tagName: string | undefined;
    if (firstChild.children.length === 1) {
      tagName = 'Fragment';
    }
    else {
      const nameIdentifyingElement = firstChild.children[firstChild.children.length - 1];
      if (nodeIsTagClassName(nameIdentifyingElement)) {
        tagName = (nameIdentifyingElement.children[0] as TextNode).value;
      }
      else if (nameIdentifyingElement.type === 'text') {
        tagName = nameIdentifyingElement.value;
      }
    }
    if (tagName !== undefined) {
      const firstPunctuationNode = firstChild.children[0];
      if (nodeIsPunctation(firstPunctuationNode)) {
        const isEndTag = getPunctuation(firstPunctuationNode) === '</';
        if (isEndTag) {
          return { tagName, tagType: TagType.End };
        }
        else {
          const secondPunctuationNode = node.children[node.children.length - 1];
          if (nodeIsPunctation(secondPunctuationNode)) {
            const isSelfClosing = getPunctuation(secondPunctuationNode) === '/>';
            if (isSelfClosing || isVoidElement(tagName)) {
              return { tagName, tagType: TagType.SelfClosing };
            }
            return { tagName, tagType: TagType.Start };
          }
        }
      }
    }
  }
}
