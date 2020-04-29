import { ElementNode, TextNode, RenderNode } from "react-syntax-highlighter-renderer-interceptor";

export function isCommentNode(renderNode:RenderNode): renderNode is ElementNode{
  let isCommentNode = false;
  if(renderNode.type==='element'){
    const classNames = renderNode.properties.className||[];
    for(let i = 0;i< classNames.length;i++){
      const className = classNames[i];
      if(className==='comment'||className==='hljs-comment'){
        isCommentNode = true;
        break;
      }
    }
  }
  return isCommentNode;
}
export function getCommentTextNode(node:RenderNode){
  if(!isCommentNode(node)){
    throw new Error('not an element node');
  }else{
    return node.children[0] as TextNode;
  }
}


export function createCommentNode(comment:string): ElementNode{
  return {
    type:'element',
    tagName:'span',
    properties:{
      className:['token', 'comment','hljs-comment']
    },
    children:[
      {
        type:'text',
        value:comment
      } 
    ]
  }
}
