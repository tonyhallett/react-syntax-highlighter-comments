import * as React from "react";
export declare type DisplayReactFCObject<T> = {
    readonly [P in keyof T]: React.FC & {
        displayName: string;
    };
};
export declare function generateStylePropAwareComponentsInternal<T extends {
    [key: string]: Record<string, any>;
}>(componentDetails: T, span?: boolean, acceptsMergeStyle?: boolean): DisplayReactFCObject<T>;
