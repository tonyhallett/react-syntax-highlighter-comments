import { createCommentNodeRenderInterceptor } from "../../helpers/commentHofs";
import { commentSymbolParser } from "../../helpers/commentSymbolParser";
import { getCommentTextNode, createCommentNode } from "../../common";
import { ElementNode } from "react-syntax-highlighter-renderer-interceptor";
import { TypeCaptureResult, typeCaptureChar } from "./typeCaptureChar";
import { arrayFind } from "../../helpers/esFeatures";

export interface TypeInterceptorDetails{
  name:string,
  component:React.ComponentType
}

export function createTypeInterceptor(...typeDetails:TypeInterceptorDetails[]){
  function createChildNodes(parsed:Array<string|TypeCaptureResult>){
    const childNodes:ElementNode[] = [];
    for(let i=0;i<parsed.length;i++){
      const commentOrCustomType = parsed[i];
      if(typeof commentOrCustomType === 'string'){
        childNodes.push(createCommentNode(commentOrCustomType));
      }else{
        const matchingType = arrayFind(typeDetails,td => td.name === commentOrCustomType.name );
        let tagName:any;
        if(matchingType===undefined){
          let reactElementName = commentOrCustomType.name.trim();
          if(reactElementName[0].toLowerCase() === reactElementName[0]){
            tagName = reactElementName;
          }else{
            continue;
          }
        }else{
          tagName = matchingType.component;
        }
        const props = commentOrCustomType.props?commentOrCustomType.props:{};
        const typeNode: ElementNode = {
          tagName,
          type:'element',
          properties:{
            className:[],
            ...props
          },
          children:[]
        }
        childNodes.push(typeNode);
      }
      
    }
    return childNodes;
  }
  return createCommentNodeRenderInterceptor(nodeRenderDetails => {
    const comment=getCommentTextNode(nodeRenderDetails.node).value;
    const parsed = commentSymbolParser(comment,typeCaptureChar);
    if(parsed.length>1){
      nodeRenderDetails.node = {
        properties:{
          className:[] as string[],
        },
        type:'element',
        tagName:'span',
        children:createChildNodes(parsed)
      }
    }
    return nodeRenderDetails
  })
}