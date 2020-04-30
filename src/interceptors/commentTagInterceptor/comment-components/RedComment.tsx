import * as React from "react";
import { StyledComment, StyledCommentProps } from "./StyledComment";
import { CommentTagType} from './common';

export const RedComment:CommentTagType<StyledCommentProps> = (
  {
    commentDisplay, 
    comment, 
    children, 
    tab, 
    respectStyleProp,
    commentStyleProp,
    style = {}
  }) => {
  let redComment = comment?comment:children;
  if(commentDisplay && redComment){
    style.color = 'red';
    return <StyledComment commentDisplay respectStyleProp={respectStyleProp} commentStyleProp={commentStyleProp} comment={redComment as any} tab={tab} style={style}/>
  }
  return null;
}
RedComment.displayName = 'RedComment';