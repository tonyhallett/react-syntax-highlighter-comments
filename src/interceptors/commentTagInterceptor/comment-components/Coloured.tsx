import * as React from "react";
import { colorNamesObject } from "../../../helpers/colorNames";
import { DisplayReactFCObject } from '../helpers'
import { CommentTagType } from "./common";
import { CommentTagProps } from "../interceptor";

type ColouredType = CommentTagType<{color:string,style?:React.CSSProperties}> ;
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
    const baseStyle:React.CSSProperties = respectStyleProp && commentStyleProp?commentStyleProp:{};
    const actualStyle = {...baseStyle,...style}
    actualStyle.color = color;

    if(typeof children !== 'string'){
      const childrenWithColor = React.Children.map(children,c => {
        const child = c as any;
        if(child && child.type.acceptsMergeStyle){
          return React.cloneElement(child,{mergeStyle:{...style,color}})
        }
        return c;
      });
      return <span style={actualStyle}>{childrenWithColor}</span>
    }
    
    return <span style={actualStyle}>{children?children:''}</span>
  }
  return null;
}
Coloured.displayName = 'Coloured';


type ColorNameComponentsType = DisplayReactFCObject<typeof colorNamesObject>
export const ColorNameComponents:ColorNameComponentsType = {} as any;
Object.keys(colorNamesObject).forEach(colorName => {
  const Component:ColouredType = (props) => {
    return <Coloured 
      {...props}
      color={(colorNamesObject as any)[colorName]}>{props.children}</Coloured>
  }
  Component.displayName = colorName;
  (ColorNameComponents as any)[colorName] = Component;

});
