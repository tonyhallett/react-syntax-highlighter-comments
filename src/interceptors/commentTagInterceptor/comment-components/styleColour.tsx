import * as React from "react";
import { CommentTagType} from './common';
export const StyleColour:CommentTagType = ({commentDisplay: display, children,commentStyleProp }) =>{
  if(display){
    const color = commentStyleProp?commentStyleProp.color:undefined;
    const style = color?{color}:{};
    return <>
      <span style={style}>{children}</span> 
    </>
  }
  return null;
}
StyleColour.displayName = 'StyleColour';

