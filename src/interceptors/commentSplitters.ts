import { NodeRenderDetails } from "react-syntax-highlighter-renderer-interceptor";
import { getCommentTextNode, createCommentNode } from "../common";
import { createCommentNodeRenderInterceptor } from "../helpers/commentHofs";
import { commentSymbolParser, CaptureChar, ProcessResult } from "../helpers/commentSymbolParser";
import { stringStartsWith } from "../helpers/esFeatures";
export function createCommentSplitter(splitter: (comment: string) => string[] | undefined) {
  return createCommentNodeRenderInterceptor(nodeRenderDetails => {
    const comment = getCommentTextNode(nodeRenderDetails.node).value;
    const newComments = splitter(comment);
    if (newComments&&newComments.length>1) {
      const newNodeDetails: NodeRenderDetails = {
        key: nodeRenderDetails.key,
        stylesheet: nodeRenderDetails.stylesheet,
        useInlineStyles: nodeRenderDetails.useInlineStyles,
        node: {
          properties: {
            className: [],
          },
          type: 'element',
          tagName: 'span',
          children: newComments.map(newComment => createCommentNode(newComment))
        }
      };
      return newNodeDetails;
    }
    return nodeRenderDetails;
  });
}

class DollarCaptureChar implements CaptureChar<string>{
  char='$'
  process = (char:string)=> {
    if(char===this.char){
      return ProcessResult.Completed;
    }
    return ProcessResult.Continue;
  }
  getCompleted = ()=>{
    return this.processedText
  }
  processedText = ''
}
const dollarCaptureChar = new DollarCaptureChar();
export const dollarCommentSplitter = createCommentSplitter(comment => {
  let result = commentSymbolParser(comment, dollarCaptureChar);
  if(result.length>1){
    result = result.map((r,i)=> {
      if(i===0){
        return r;
      }else{
        if(r.indexOf(' ')===0){
          return r.substr(1);
        }
        return r;
      }
    })
  }
  return result;
})



// this is for if you do not want to colour // | /* */  the same as the comment
// useful if want to match the behaviour of dollar comment splitting above
export const splitCommentChars = createCommentSplitter(comment => {
  let split:string[]|undefined
  if(comment.length>2){
    if(stringStartsWith(comment,'//')){
      split = [comment.substr(0,2),comment.substr(2)]
    }else if(stringStartsWith(comment,'/*')){
      split = [comment.substr(0,2),comment.substr(2,comment.length - 4),comment.substr(comment.length-2)];
    }
  }
  return split;
})