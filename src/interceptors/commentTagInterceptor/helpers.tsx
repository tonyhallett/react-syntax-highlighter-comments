import { ComponentProvider } from "./interceptor";
import { commentComponents } from "./comment-components";
import {generateStylePropAwareComponentsInternal} from "./helpersInternal"
import { DisplayReactFCObject } from "./DisplayReactFCObject";
import { createComponentFinder, createComponentProvider } from "./createComponentProvider";
export { DisplayReactFCObject} from './DisplayReactFCObject'

// todo - resolve <T extends {[key:string]:React.CSSProperties}>
export function generateStylePropAwareComponents<T extends {[key:string]:Record<string,any>}>(componentDetails:T,span=true):DisplayReactFCObject<T>{
  return generateStylePropAwareComponentsInternal(componentDetails,span,false,false);
}


export const builtInComponentProvider: ComponentProvider = createComponentProvider(commentComponents);
export const builtInComponentFinder = createComponentFinder(commentComponents);
