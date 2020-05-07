import * as React from "react";
import { CommentTagProps } from "./interceptor";
import { DisplayReactFCObject } from "./DisplayReactFCObject";

export function generateStylePropAwareComponentsInternal<T extends {[key:string]:Record<string,any>}>(componentDetails:T,span=true,acceptsMergeStyle=true,mergeStyleToChildren=true):DisplayReactFCObject<T>{
  type ReturnType = DisplayReactFCObject<typeof componentDetails>

  const components = {} as ReturnType;
  Object.keys(componentDetails).forEach(componentName => {
    const componentStyle = componentDetails[componentName];
    const Component:React.FC<CommentTagProps & {mergeStyle?:React.CSSProperties,style?:React.CSSProperties}> = (
      {
        commentDisplay, 
        children,
        commentStyleProp,
        respectStyleProp, 
        mergeStyle, // as used by Coloured and ColourNameComponents
        style // to more likely be supplied by the ComponentProvider
      }) => {
      if(commentDisplay){
        if(!acceptsMergeStyle){
          mergeStyle={}
        }
        const baseStyle:React.CSSProperties = respectStyleProp && commentStyleProp?commentStyleProp:{};
        const actualStyle = {...baseStyle,...mergeStyle,...style,...componentStyle};

        const childrenType = typeof children;
        if(childrenType !== 'string' && mergeStyleToChildren){
          const childrenWithMergedStyle = React.Children.map(children,c => {
            const child = c as any;
            if(child && child.type.acceptsMergeStyle){
              return React.cloneElement(child,{mergeStyle:{...mergeStyle,...style,...componentStyle}})
            }
            return c;
          });
          return <span style={actualStyle}>{childrenWithMergedStyle}</span>
        }
        
        
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
