import { createCommentMatchReplaceStylerFn } from "./styler creators/createCommentMatchReplaceStyler";

export interface CommentCharsStylingOptions{
  singleLineStyle?:React.CSSProperties,
  multilineStartStyle?:React.CSSProperties,
  multilineEndStyle?:React.CSSProperties,
  multilineStyle?:React.CSSProperties,
  allStyle?:React.CSSProperties
}
const singleLine='//';
const multilineStart='/*';
const multilineEnd = '*/';

export const createCommentCharsStyler=(stylingOptions:CommentCharsStylingOptions)=>{
  return createCommentMatchReplaceStylerFn(comment => {
    let appliedStyle:React.CSSProperties|undefined
    if(comment===singleLine){
      appliedStyle = stylingOptions.singleLineStyle?stylingOptions.singleLineStyle:stylingOptions.allStyle;
    }else if(comment === multilineStart){
      appliedStyle = stylingOptions.multilineStartStyle?stylingOptions.multilineStartStyle:stylingOptions.multilineStyle?stylingOptions.multilineStyle:stylingOptions.allStyle;
    }else if(comment === multilineEnd){
      appliedStyle = stylingOptions.multilineEndStyle?stylingOptions.multilineEndStyle:stylingOptions.multilineStyle?stylingOptions.multilineStyle:stylingOptions.allStyle;
    }

    if(appliedStyle){
      return {
        newComment:comment,
        matchStyle:appliedStyle
      }
    }
  })
}
