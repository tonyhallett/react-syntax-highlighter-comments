import * as React from "react";
import { CommentTagType } from "./common";
export const CommentStyle:CommentTagType = (
  { 
    commentDisplay, 
    children, 
    commentStyleProp }) => {
  if (commentDisplay) {
    return <span style={commentStyleProp}>{children}</span>;
  }
  return null;
}
CommentStyle.displayName = 'CommentStyle';