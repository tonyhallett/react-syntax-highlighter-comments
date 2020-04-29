import * as React from "react";
import { CommentTagType } from "./common";
export const CommentStyle:CommentTagType = ({ commentDisplay: display, children, commentStyleProp: commentStyle }) => {
  if (display) {
    return <>
      <span style={commentStyle}>{children}</span>
    </>;
  }
  return null;
}
CommentStyle.displayName = 'CommentStyle';