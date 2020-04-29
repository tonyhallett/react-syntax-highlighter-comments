import * as React from "react";
import { CommentTagProps } from "./interceptor";

export type DisplayReactFCObject<T> = {
  readonly [P in keyof T]: React.FC&{displayName:string};
}


export function generateStylePropAwareComponentsInternal<T extends {[key:string]:Record<string,any>}>(componentDetails:T,span=true,acceptsMergeStyle=true):DisplayReactFCObject<T>{
  type ReturnType = DisplayReactFCObject<typeof componentDetails>

  const components = {} as ReturnType;
  Object.keys(componentDetails).forEach(componentName => {
    const componentStyle = componentDetails[componentName];
    const Component:React.FC<CommentTagProps & {mergeStyle?:React.CSSProperties}> = ({commentDisplay: display, children,commentStyleProp: commentStyle,respectStyleProp, mergeStyle}) => {
      if(display){
        const baseStyle:React.CSSProperties = respectStyleProp && commentStyle?commentStyle:{};
        const actualStyle = {...baseStyle,...componentStyle,...mergeStyle}
        if(span){
          return <span style={actualStyle}>{children?children:''}</span>
        }
        return <div style={actualStyle}>{children?children:''}</div>
        
      }
      return null;
    }
    Component.displayName = componentName;
    if(acceptsMergeStyle){
      (Component as any).acceptsMergeStyle = true;
    }
    (components as any)[componentName] = Component;
  
  });
  return components;
}
