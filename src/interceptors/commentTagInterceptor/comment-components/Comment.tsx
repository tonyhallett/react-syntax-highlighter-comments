import * as React from "react";
import { CommentTagType } from "./common";
export const Comment:CommentTagType = ({
  commentDisplay,
  children,
  commentStyleProp, 
  respectStyleProp })=>{
  if(commentDisplay){
    return <>
      <span style={respectStyleProp?commentStyleProp:{}}>// </span> 
      {children}
    </>
  }
  return null;
}
Comment.displayName='Comment';