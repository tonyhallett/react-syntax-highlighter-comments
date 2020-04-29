import * as React from "react";
import { CommentTagType } from "./common";
export const Comment:CommentTagType = ({commentDisplay: display, children,commentStyleProp: commentStyle, respectStyleProp })=>{
  if(display){
    return <>
      <span style={respectStyleProp?commentStyle:{}}>// </span> 
      {children}
    </>
  }
  return null;
}
Comment.displayName='Comment';