import * as React from "react";
import { StyledComment, StyledCommentProps } from "./StyledComment";
import { CommentTagType} from './common';

export type RedCommentProps = Omit<StyledCommentProps,'style'>;
export const RedComment:CommentTagType<RedCommentProps> = ({commentDisplay: display, comment, children, tab, respectStyleProp,commentStyleProp: commentStyle}) => {
  let redComment = comment?comment:children;
  if(display && redComment){
    return <StyledComment commentDisplay respectStyleProp={respectStyleProp} commentStyleProp={commentStyle} comment={redComment as any} tab={tab} style={{color:'red'}}/>
  }
  return null;
}
RedComment.displayName = 'RedComment';