import { NodeRenderInterceptor} from "react-syntax-highlighter-renderer-interceptor";
import { getCommentTextNode } from "../../common";
import { createCommentNodeRenderInterceptor } from "../../helpers/commentHofs";
import { createLinksAndComments } from "./createLinksAndComments";

export interface LinkDetails{
  url:string,
  linkText?:string,
  linkType?: any,//todo use the same typing as React.createElement,
  linkProps?:any//todo use the same typing as React.createElement,
  linkStyle?:React.CSSProperties,
}

export type CommentLinkMatch = Array<string|LinkDetails>

export interface CommentLinkMatcher{
  (comment:string):CommentLinkMatch|undefined;
}


export function createCommentLinkInterceptor(commentLinkMatcher:CommentLinkMatcher){
  const commentLinkInterceptor:NodeRenderInterceptor = createCommentNodeRenderInterceptor( nodeDetails => {
    const node = nodeDetails.node;
    const commentLinkMatch = commentLinkMatcher(getCommentTextNode(node).value);
    if(commentLinkMatch){
      nodeDetails.node = {
          properties:{
            className:nodeDetails.node.properties.className.filter(cn=>!(cn==='comment'||cn==='hljs-comment')),
          },
          type:'element',
          tagName:'span',
          children:createLinksAndComments(commentLinkMatch)
        }
    }
    return nodeDetails;
  })
  return commentLinkInterceptor;
}
