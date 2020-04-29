import * as React from "react";
import { CommentTagType } from "./common";
export const CommentLink:CommentTagType<{linkProps?:any,linkStyleProp?:React.CSSProperties}> = ({commentDisplay: display, linkProps ={}, linkStyleProp ={},children, respectStyleProp})=>{
  if(display){
    const linkPropsStyle = linkProps.style||{};
    const mergedStyle = {...(respectStyleProp?linkStyleProp:{}),...linkPropsStyle}
    return <a {...linkProps} style={mergedStyle}>{children}</a>
  }
  return null;
}
CommentLink.displayName = 'CommentLink';
( CommentLink as any).styleProps='link';