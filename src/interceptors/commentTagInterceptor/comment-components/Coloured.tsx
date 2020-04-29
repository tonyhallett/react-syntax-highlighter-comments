import * as React from "react";
import { colorNamesObject } from "../../../helpers/colorNames";
import { DisplayReactFCObject } from '../helpers'
import { CommentTagType } from "./common";
import { CommentTagProps } from "../interceptor";

export const Coloured:CommentTagType<{color:string}> = ({commentDisplay: display, color, children,commentStyleProp: commentStyle,respectStyleProp}) => {
  if(display){
    const childrenType = typeof children;
    if(childrenType !== 'string'){
      const childrenWithColor = React.Children.map(children,c => {
        const child = c as any;
        if(child && child.type.acceptsMergeStyle){
          return React.cloneElement(child,{mergeStyle:{color}})
          
        }
        return c;
      });
      return <>{childrenWithColor}</>
    }
    const baseStyle:React.CSSProperties = respectStyleProp && commentStyle?commentStyle:{};
    baseStyle.color = color;
    return <span style={baseStyle}>{children?children:''}</span>
  }
  return null;
}
Coloured.displayName = 'Coloured';


type ColorNameComponentsType = DisplayReactFCObject<typeof colorNamesObject>
export const ColorNameComponents:ColorNameComponentsType = {} as any;
Object.keys(colorNamesObject).forEach(colorName => {
  const Component:React.FC<CommentTagProps>&{displayName:string} = ({commentDisplay: display, children,commentStyleProp: commentStyle,respectStyleProp}) => {
    return <Coloured commentDisplay={display} commentStyleProp={commentStyle} respectStyleProp={respectStyleProp} color={(colorNamesObject as any)[colorName]}>{children}</Coloured>
  }
  Component.displayName = colorName;
  (ColorNameComponents as any)[colorName] = Component;

});
