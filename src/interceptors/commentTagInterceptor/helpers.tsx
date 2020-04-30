import { ComponentProvider } from "./interceptor";
import { commentComponents } from "./comment-components";
import {generateStylePropAwareComponentsInternal, DisplayReactFCObject} from "./helpersInternal"
export { DisplayReactFCObject} from './helpersInternal'

// todo - resolve <T extends {[key:string]:React.CSSProperties}>
export function generateStylePropAwareComponents<T extends {[key:string]:Record<string,any>}>(componentDetails:T,span=true):DisplayReactFCObject<T>{
  return generateStylePropAwareComponentsInternal(componentDetails,span,false,false);
}


export const builtInComponentProvider: ComponentProvider = tagName => {
  return builtInComponentFinder(tagName);
}
export const builtInComponentFinder = ( tagName:string) => commentComponents.find(ct=>ct.displayName === tagName) as any;