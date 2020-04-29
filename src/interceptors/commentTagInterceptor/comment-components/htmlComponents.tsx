import * as React from "react";
import { CommentTagProps } from "../interceptor";
import { CommentTagType } from "./common";

const htmlElements:Array<keyof JSX.IntrinsicElements> = ['span','div'];

function wrapComponent<T extends keyof JSX.IntrinsicElements>(htmlElement:T){
  const Component:React.FC<CommentTagProps & JSX.IntrinsicElements[T]> = ({commentDisplay: display, children,commentStyleProp: commentStyle,respectStyleProp,...other}) => {
    if(display){
      const baseStyle:React.CSSProperties = respectStyleProp && commentStyle?commentStyle:{};
      const originalStyle = other.style;

      const actualStyle = {...baseStyle,...originalStyle}
      return React.createElement(htmlElement,{...other,style:actualStyle},children);
    }
    return null;
  }
  const capitalizedName = htmlElement.substr(0,1).toUpperCase() + htmlElement.substr(1);
  Component.displayName=capitalizedName;
  return Component;
}

type CommentHtmlComponents = {[k in keyof JSX.IntrinsicElements]:CommentTagType<JSX.IntrinsicElements[k]>};

export const HtmlComponents:CommentHtmlComponents = {} as any;

htmlElements.reduce((prev,value)=> {
  (prev as any)[value] = wrapComponent(value);
  return prev;
},HtmlComponents)


