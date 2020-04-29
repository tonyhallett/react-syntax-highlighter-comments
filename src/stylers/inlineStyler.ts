import { createCommentStyleCreator } from "../helpers/commentHofs";
import { commentSymbolParser, ProcessResult } from "../helpers/commentSymbolParser";
import { getCommentTextNode } from "../common";
import { StringToObjectParser } from "string-object-to-object";
import { StringToObjectCaptureChar } from "../helpers/StringToObjectCaptureChar";


class InlineStyleCaptureChar extends StringToObjectCaptureChar<React.CSSProperties>{
  private inlineStyle:object|undefined;
  
  char = '^';  
  protected stringToObjectCompleted(completed: object): void {
    this.inlineStyle = completed;
  }
  getCompleted = () => {
    return this.inlineStyle!;
  }
  reset(){
    this.inlineStyle = undefined;
    this.stringToObjectParser = undefined;
  }
  process = (char: string) => {
    if(this.inlineStyle && char!==this.char){
      if(char.trim()===''){
        return ProcessResult.Continue;
      }
      return ProcessResult.Break;
    }
    if(char===this.char){
      if(this.stringToObjectParser!==undefined){
        return this.processWithStringToObjectParser(char);
      }
      return ProcessResult.Completed;
    }
    if(char==='{'){
      if(this.stringToObjectParser===undefined){
        this.stringToObjectParser = new StringToObjectParser();
        return ProcessResult.Continue;
      }
      return this.processWithStringToObjectParser(char);
    }else{
      if(this.stringToObjectParser===undefined){
        return ProcessResult.Continue;
      }
      if(char==='}'){
        let result = this.processWithStringToObjectParser(char);
        if(result === ProcessResult.Completed){
          result = ProcessResult.Continue;
        }
        return result;
      }
      return this.processWithStringToObjectParser(char);
    }
    
  }
}

export const inlineStyler = createCommentStyleCreator((currentStyle,classNames,node) => {
  const captureChar = new InlineStyleCaptureChar();
  const commentTextNode = getCommentTextNode(node);
  const parsed = commentSymbolParser(commentTextNode.value, captureChar);
  if(parsed.length>1){
    const comments:string[]=[];
    let mergeStyle:React.CSSProperties;
    parsed.forEach(commentOrStyle => {
      if(typeof commentOrStyle === 'string'){
        comments.push(commentOrStyle);
      }else{
        mergeStyle = commentOrStyle;
      }
    });
    commentTextNode.value=comments.join('');
    currentStyle = {...currentStyle,...mergeStyle!};
  }
  return currentStyle;
})