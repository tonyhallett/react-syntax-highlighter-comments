import * as React from "react";
import { CommentTagType} from './common';
export const StyleColour:CommentTagType = ({commentDisplay, children,commentStyleProp }) =>{
  if(commentDisplay){
    const color = commentStyleProp?commentStyleProp.color:undefined;
    const style = color?{color}:{};
    return <span style={style}>{children}</span> 
  }
  return null;
}
StyleColour.displayName = 'StyleColour';

