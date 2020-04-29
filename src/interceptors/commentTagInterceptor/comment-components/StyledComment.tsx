import * as React from "react";
import { getSpacing, CommentTagType } from "./common";

export type StyledCommentProps = {tab?:number,style?:React.CSSProperties,comment?:string|string[]};

export const StyledComment:CommentTagType<StyledCommentProps> = ({commentDisplay: display, comment, style,tab = 0, children,commentStyleProp: commentStyle,respectStyleProp}) => {
  let commentStringOrArray = comment ? comment : children as string|Array<string>;
  const spacing = getSpacing(tab);
  const commentSpacing = `   ${spacing}`;

  if(display){
    const baseStyle:React.CSSProperties = respectStyleProp && commentStyle?commentStyle:{};
    const mergedStyle:React.CSSProperties = {...baseStyle,...style};
    // for now not styling the comments differently
    if(Array.isArray(commentStringOrArray)){
      if(commentStringOrArray.length>0){
        return <>
          <span style={mergedStyle}>/*</span> 
          {commentStringOrArray.map((line,i) => {
            return <div key={i}><span>{commentSpacing}</span><span style={mergedStyle}>{line}</span></div>
          })}
            <div><span>{spacing}</span><span style={mergedStyle}>*/</span></div>
        </>
      }
      return null;
    }
    else{
      return <span style={mergedStyle}>{`// ${commentStringOrArray}`}</span>
    }
    
  }
  return null;
}

StyledComment.displayName = 'StyledComment';