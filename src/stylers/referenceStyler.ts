import { createCommentStyleCreator } from "../helpers/commentHofs";
import { getCommentTextNode } from "../common";
import { CaptureChar, ProcessResult, commentSymbolParser } from "../helpers/commentSymbolParser";
import { Stylesheet } from "react-syntax-highlighter-renderer-interceptor";


export interface ReferenceStylerCaptureCharResult{
  classes:string
}
export class ReferenceStylerCaptureChar implements CaptureChar<ReferenceStylerCaptureCharResult>{
  char='%';  
  process(char:string){
    if(char === this.char){
      return ProcessResult.Completed;
    }
    return ProcessResult.Continue
  }
  getCompleted(){
    return {
      classes:this.processedText
    }
  }
  processedText = ''
}
export const referenceStylerCaptureChar = new ReferenceStylerCaptureChar();


export const referenceStyler = createCommentStyleCreator((currentStyle,classNames, node) => {
  const refStyle = node.refStyle as Stylesheet;
  if(refStyle){
    const commentTextNode = getCommentTextNode(node);
    const parsed = commentSymbolParser(commentTextNode.value, referenceStylerCaptureChar);
    if(parsed.length>1){
      let comments ='';
      for(let i=0;i<parsed.length;i++){
        const commentOrResult = parsed[i];
        if(typeof commentOrResult ==='string'){
          comments+=commentOrResult
        }else{
          const classes = commentOrResult.classes.split(' ');
          classes.forEach(cl => {
            if(refStyle[cl]){
              currentStyle = {
                ...currentStyle,
                ...refStyle[cl]
              }
            }
          })
        }
      }
      commentTextNode.value = comments;
      
    }
  }
  return currentStyle;
})
