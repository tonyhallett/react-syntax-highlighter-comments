import { createCommentNode } from "../../common";
import { CommentLinkMatch } from "./commentLinkInterceptorCreator";
import { ElementNode } from "react-syntax-highlighter-renderer-interceptor";
export function createLinksAndComments(commentLinkMatch: CommentLinkMatch) {
  return commentLinkMatch.map(commentOrLink => {
    if (typeof commentOrLink === 'string') {
      return createCommentNode(commentOrLink);
    }
    return createLinkNode(commentOrLink.url, commentOrLink.linkStyle, commentOrLink.linkText, commentOrLink.linkProps, commentOrLink.linkType);
  });
}

export function createLinkNode(href:string,style:React.CSSProperties|undefined,text:string|undefined,props:any,type:any){
  const linkNode:ElementNode = {
    type:'element',
    tagName:type?type:'a',
    properties:{
      className:['link'],
      href,
      style,
      ...props
    },
    children:[
      {
        type:'text',
        value:text?text:href
      } 
    ]
  }
  return linkNode;
}
