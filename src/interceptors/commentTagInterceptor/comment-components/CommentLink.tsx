import * as React from "react";
import { CommentTagType } from "./common";


type LinkProps=React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>,HTMLAnchorElement>;
export const CommentLink:CommentTagType<{linkStyleProp?:React.CSSProperties} & LinkProps> = (
  {
    commentDisplay, 
    commentStyleProp,
    linkStyleProp = {},
    children, 
    respectStyleProp,
    ...linkProps
  })=>{
  if(commentDisplay){
    linkProps = linkProps || {};
    const linkPropsStyle = linkProps.style||{};
    const respectedLinkStyle = respectStyleProp?linkStyleProp:{};
    const mergedStyle = {...respectedLinkStyle,...linkPropsStyle}
    return <a {...linkProps} style={mergedStyle}>{children}</a>
  }
  return null;
}
CommentLink.displayName = 'CommentLink';
( CommentLink as any).styleProps='link';

/* export const CommentLink:CommentTagType<{linkProps?:LinkProps,linkStyleProp?:React.CSSProperties}> = (
  {
    commentDisplay, 
    linkProps ={}, 
    linkStyleProp ={},
    children, 
    respectStyleProp})=>{
  if(commentDisplay){
    const linkPropsStyle = linkProps.style||{};
    const respectedLinkStyle = respectStyleProp?linkStyleProp:{};
    const mergedStyle = {...respectedLinkStyle,...linkPropsStyle}
    return <a {...linkProps} style={mergedStyle}>{children}</a>
  }
  return null;
} */