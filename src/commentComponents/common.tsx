import * as React from "react";
import { CommentCharsStylingOptions } from "../stylers/commentCharsStyler";

export function checkCommentCharsDependency(commentCharsStyingOptions:CommentCharsStylingOptions|undefined, splitCommentChars:boolean){
  if(commentCharsStyingOptions && !splitCommentChars){
    throw new Error('commentCharsStylingOptions requires splitCommentChars true');
  }
}
export function checkMergeStylesDependency(mergeStyles:boolean|undefined, commentClasses:boolean|undefined){
  if(mergeStyles && !commentClasses){
    throw new Error('mergeStyles is to be used with commentClasses');
  }
}

export function cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse(child:any,customRenderer:any,style?:any){
  if(style){
    return React.cloneElement(child,{renderer:customRenderer,style,wrapLines:false})
  }
  return React.cloneElement(child,{renderer:customRenderer,wrapLines:false})
}