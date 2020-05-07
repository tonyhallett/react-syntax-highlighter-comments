import { DisplayReactFCObject } from "./DisplayReactFCObject";
export declare function generateStylePropAwareComponentsInternal<T extends {
    [key: string]: Record<string, any>;
}>(componentDetails: T, span?: boolean, acceptsMergeStyle?: boolean, mergeStyleToChildren?: boolean): DisplayReactFCObject<T>;
