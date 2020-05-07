/// <reference types="react" />
export interface ValueName<T extends 'textDecorationColor' | 'textDecorationLine' | 'textDecorationStyle' = any> {
    value: React.CSSProperties[T];
    componentName: string;
}
export interface TextDecorationGeneration<T extends 'textDecorationColor' | 'textDecorationLine' | 'textDecorationStyle' = any> {
    prop: T;
    valueNames: Array<{
        value: React.CSSProperties[T];
        componentName: string;
    } | undefined>;
}
export declare function getColorGeneration(): TextDecorationGeneration<'textDecorationColor'>;
export declare const styleGeneration: TextDecorationGeneration<'textDecorationStyle'>;
export declare const lineGeneration: TextDecorationGeneration<'textDecorationLine'>;
