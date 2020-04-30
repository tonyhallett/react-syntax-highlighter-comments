import * as React from "react";
import { getSpacing, CommentTagType } from "./common";

export type StyledCommentProps = {tab?:number,style?:React.CSSProperties,comment?:string|string[]};

export const StyledComment:CommentTagType<StyledCommentProps> = (
  {
    commentDisplay, 
    comment, 
    style,
    tab = 0, 
    children,
    commentStyleProp,
    respectStyleProp}) => {
  let commentStringOrArray = comment ? comment : children as string|Array<string>;
  const spacing = getSpacing(tab);
  const commentSpacing = `   ${spacing}`;

  if(commentDisplay){
    const baseStyle:React.CSSProperties = respectStyleProp && commentStyleProp?commentStyleProp:{};
    const actualStyle:React.CSSProperties = {...baseStyle,...style};
    // for now not styling the comment chars differently
    if(Array.isArray(commentStringOrArray)){
      if(commentStringOrArray.length>0){
        return <>
          <span style={actualStyle}>/*</span> 
          {commentStringOrArray.map((line,i) => {
            return <div key={i}><span>{commentSpacing}</span><span style={actualStyle}>{line}</span></div>
          })}
            <div><span>{spacing}</span><span style={actualStyle}>*/</span></div>
        </>
      }
      return null;
    }
    else{
      return <span style={actualStyle}>{`// ${commentStringOrArray}`}</span>
    }
    
  }
  return null;
}

StyledComment.displayName = 'StyledComment';