/// <reference types="react" />
import { CommentTagType } from "./common";
declare type CommentHtmlComponents = {
    [k in keyof JSX.IntrinsicElements]: CommentTagType<JSX.IntrinsicElements[k]>;
};
export declare const HtmlComponents: CommentHtmlComponents;
export {};
