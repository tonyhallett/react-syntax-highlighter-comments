import { ComponentProvider } from "./interceptor";
import { DisplayReactFCObject } from "./helpersInternal";
export { DisplayReactFCObject } from './helpersInternal';
export declare function generateStylePropAwareComponents<T extends {
    [key: string]: Record<string, any>;
}>(componentDetails: T, span?: boolean): DisplayReactFCObject<T>;
export declare const builtInComponentProvider: ComponentProvider;
export declare const builtInComponentFinder: (tagName: string) => any;
