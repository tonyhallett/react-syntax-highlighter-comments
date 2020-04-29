import { createCommentNodeRenderInterceptor } from "../helpers/commentHofs";
import { getCommentTextNode } from "../common";
import { commentSymbolParser, ProcessResult } from "../helpers/commentSymbolParser";
import { StringToObjectCaptureChar } from "../helpers/StringToObjectCaptureChar";
import { StringToObjectParser } from "string-object-to-object";
import { isFirstNode } from "../helpers/isFirstNode";

export enum NodeObjectPropertyCaptureCharState {Initial,OpenSquare,ClosedSquare,StringToObject}
export interface NodeObjectPropertyCaptureCharResult{
  propertyName:string,
  value:object
}
export class NodeObjectPropertyCaptureChar extends StringToObjectCaptureChar<NodeObjectPropertyCaptureCharResult>{
  private propertyName = '';
  private value:object|undefined;
  private state = NodeObjectPropertyCaptureCharState.Initial;
  char= '~';  
  reset(){
    this.propertyName = '';
    this.state = NodeObjectPropertyCaptureCharState.Initial;
    this.value = undefined;
    this.stringToObjectParser = undefined;
  }
  process(char: string){
    switch(this.state){
      case NodeObjectPropertyCaptureCharState.Initial:
        if(char==='['){
          this.state = NodeObjectPropertyCaptureCharState.OpenSquare;
          return ProcessResult.Continue;
        }
        return ProcessResult.Break;
      case NodeObjectPropertyCaptureCharState.OpenSquare:
        if(char.trim()===''){
          //could use this in property name but intention unlikeley
          return ProcessResult.Continue;
        }
        if(char===']'){
          if(this.propertyName===''){
            return ProcessResult.Break;
          }
          this.state = NodeObjectPropertyCaptureCharState.ClosedSquare;
          return ProcessResult.Continue;
        }
        this.propertyName += char;
        return ProcessResult.Continue;
      case NodeObjectPropertyCaptureCharState.ClosedSquare:
        if(char.trim()===''){
          return ProcessResult.Continue;
        }
        if(char==='{'){
          this.state = NodeObjectPropertyCaptureCharState.StringToObject;
          this.stringToObjectParser = new StringToObjectParser();
          return ProcessResult.Continue;
        }
        return ProcessResult.Break;
      case NodeObjectPropertyCaptureCharState.StringToObject:
        return this.processWithStringToObjectParser(char);
    }
  }
  getCompleted():NodeObjectPropertyCaptureCharResult{
    return {
      propertyName:this.propertyName,
      value:this.value!
    }
  }
  protected stringToObjectCompleted(completed: object): void {
    this.value = completed;
  }


}
export const nodeObjectPropertyCaptureChar = new NodeObjectPropertyCaptureChar();
export function createNodeObjectPropertyAttacher(/* tripleExclamationRemoval=true */) {
  let properties: Record<string, object> = {};
  return createCommentNodeRenderInterceptor(nodeRenderDetails => {
    const node = nodeRenderDetails.node;
    const commentTextNode = getCommentTextNode(node);
    const parsed = commentSymbolParser(commentTextNode.value, nodeObjectPropertyCaptureChar);
    if (parsed.length > 1) {
      for (let i = 0; i < parsed.length; i++) {
        const commentOrResult = parsed[i];
        if (typeof commentOrResult !== 'string') {
          properties[commentOrResult.propertyName] = commentOrResult.value;
          break;
        }
      }
      /*
        todo
        given that there could be any type of commentRemover - should replace tripleExclamationRemoval
        with a replacement string

        *** until comment remover is changed for full support of removal of spaces it is sufficient to return undefined
      */
      /* if(tripleExclamationRemoval){
        commentTextNode.value = '!!!';
        return nodeRenderDetails;
      } */
      return undefined;
    }
    else {
      if (Object.getOwnPropertyNames(properties).length > 0) {
        //should have a check for allowed property names ?
        nodeRenderDetails.node = {
          ...node,
          ...properties
        };
        return nodeRenderDetails;
      }
      return nodeRenderDetails;
    }
  },() => properties = {});
}
