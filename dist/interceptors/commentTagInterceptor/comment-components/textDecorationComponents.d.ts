import { CommentTagType } from "..";
import * as React from "react";
export { TextDecorationComponents } from './textDecorationGeneration';
export declare type Shortline = 'none' | 'ul' | 'ol' | 'lt' | 'ulol' | 'ullt' | 'ollt' | 'all';
export interface TextDecorationOnlyProps {
    isSpan?: boolean;
    l?: Shortline;
    s?: 'double' | 'dotted' | 'dashed' | 'wavy';
    th?: React.CSSProperties['textDecorationThickness'];
    c: React.CSSProperties['color'];
}
export declare const TextDecoration: CommentTagType<TextDecorationOnlyProps>;
