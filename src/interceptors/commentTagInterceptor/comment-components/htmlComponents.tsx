import * as React from "react";
import { CommentTagProps } from "../interceptor";
import { CommentTagType } from "./common";

const htmlElements:Array<keyof JSX.IntrinsicElements> = ['span','div'];

function wrapComponent<T extends keyof JSX.IntrinsicElements>(htmlElement:T){
  const Component:React.FC<CommentTagProps & JSX.IntrinsicElements[T]> = (
    {
      commentDisplay, 
      children,
      commentStyleProp,
      respectStyleProp,
      ...other}) => {
    if(commentDisplay){
      const baseStyle:React.CSSProperties = respectStyleProp && commentStyleProp?commentStyleProp:{};
      const originalStyle = other.style;
      const {mergeStyle,otherProps} = other as any; 
      const actualStyle = {...baseStyle,...mergeStyle,...originalStyle}
      
      return React.createElement(htmlElement,{...otherProps,style:actualStyle},children);
    }
    return null;
  }
  Component.displayName = htmlElement;
  (Component as any).acceptsMergeStyle = true;
  return Component;
}

type CommentHtmlComponents = {[k in keyof JSX.IntrinsicElements]:CommentTagType<JSX.IntrinsicElements[k]>};


export const HtmlComponents:CommentHtmlComponents = {} as any;

htmlElements.reduce((prev,value)=> {
  (prev as any)[value] = wrapComponent(value);
  return prev;
},HtmlComponents)


