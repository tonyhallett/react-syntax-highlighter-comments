import * as React from "react";
import { colorNamesObject } from "../../../helpers/colorNames";
import { DisplayReactFCObject } from '../helpers'
import { CommentTagType } from "./common";
import { CommentTagProps } from "../interceptor";

export const Coloured:CommentTagType<{color:string,style?:React.CSSProperties}> = (
  {
    commentDisplay, 
    color, 
    children,
    commentStyleProp,
    respectStyleProp,
    style
  }) => {
  if(commentDisplay){
    const childrenType = typeof children;
    if(childrenType !== 'string'){
      const childrenWithColor = React.Children.map(children,c => {
        const child = c as any;
        if(child && child.type.acceptsMergeStyle){
          return React.cloneElement(child,{mergeStyle:{color}})
          
        }
        return c;
      });
      return <span style={{color}}>{childrenWithColor}</span>
    }
    const baseStyle:React.CSSProperties = respectStyleProp && commentStyleProp?commentStyleProp:{};
    
    const actualStyle = {...baseStyle,...style}
    actualStyle.color = color;
    return <span style={actualStyle}>{children?children:''}</span>
  }
  return null;
}
Coloured.displayName = 'Coloured';


type ColorNameComponentsType = DisplayReactFCObject<typeof colorNamesObject>
export const ColorNameComponents:ColorNameComponentsType = {} as any;
Object.keys(colorNamesObject).forEach(colorName => {
  const Component:React.FC<CommentTagProps & {style?:React.CSSProperties}>&{displayName:string} = ({commentDisplay: display, children,commentStyleProp: commentStyle,respectStyleProp, style}) => {
    return <Coloured style={style} commentDisplay={display} commentStyleProp={commentStyle} respectStyleProp={respectStyleProp} color={(colorNamesObject as any)[colorName]}>{children}</Coloured>
  }
  Component.displayName = colorName;
  (ColorNameComponents as any)[colorName] = Component;

});
