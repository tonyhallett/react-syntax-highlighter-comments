/// <reference types="react" />
export declare type DisplayReactFCObject<T> = {
    readonly [P in keyof T]: React.FC<{
        style?: React.CSSProperties;
    }> & {
        displayName: string;
    };
};
