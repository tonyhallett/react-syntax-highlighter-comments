import { StyleCreator, NodeRenderInterceptor, NodeRenderDetails, ElementNode, Stylesheet } from "react-syntax-highlighter-renderer-interceptor";
import { isCommentNode } from "../common";
import { isFirstNode } from "./isFirstNode";

export function createCommentStyleCreator(styleCreator:StyleCreator){
  const commentStyleCreator:StyleCreator = (currentStyle, className, node) => {
    if(isCommentNode(node)){
      return styleCreator(currentStyle, className, node);
    }
    return currentStyle;
  };
  return commentStyleCreator;
}
export interface CommentNodeRenderDetails{
  key:string,
  node:ElementNode,
  stylesheet:Stylesheet,
  useInlineStyles:boolean
}
export interface CommentRenderInterceptor{
  (nodeRenderDetails:CommentNodeRenderDetails):NodeRenderDetails|undefined
}
export function createCommentNodeRenderInterceptor(nodeRenderInterceptor:CommentRenderInterceptor,firstNodeReset?:()=>void){
  const commentNodeRenderInterceptor:NodeRenderInterceptor = (nodeRenderDetails) => {
    if(firstNodeReset && isFirstNode(nodeRenderDetails)){
      firstNodeReset();
    }
    if(isCommentNode(nodeRenderDetails.node)){
      return nodeRenderInterceptor(nodeRenderDetails as CommentNodeRenderDetails)
    }
    return nodeRenderDetails;
  }
  return commentNodeRenderInterceptor;
}

