/// <reference types="react" />
interface CreateColorStyleOptions {
    keyPrefix: string;
    colorProperty: string;
}
export declare function createColorStyle(...options: CreateColorStyleOptions[]): Record<string, import("react").CSSProperties>;
export declare const colorStyle: Record<string, import("react").CSSProperties>;
export {};
