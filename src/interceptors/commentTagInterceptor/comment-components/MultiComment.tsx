import * as React from "react";
import { getSpacing, CommentTagType } from "./common";

export const MultiComment:CommentTagType<{tab?:number}> = (
  {
    commentDisplay, 
    children,
    tab = 0, 
    commentStyleProp,
    respectStyleProp 
  }) => {
  if(commentDisplay&&Array.isArray(children)){
    const spacing = getSpacing(tab);
    const commentSpacing = `   ${spacing}`;
    const style:React.CSSProperties = respectStyleProp && commentStyleProp?commentStyleProp:{};
    return <>
      <span style={style}>/*</span> 
      {children && (children as React.ReactNode[]).map((c,i)=><div key={i}><span>{commentSpacing}</span>{c}</div>)}
      <div><span>{spacing}</span><span style={style}>*/</span></div>
    </>
  }
  return null;
}
MultiComment.displayName = 'MultiComment';
