/// <reference types="react" />
import { StyleCreator } from "react-syntax-highlighter-renderer-interceptor";
export declare function createCommentRegex(matchCharsRegexPart: string): RegExp;
export declare const commentRegexReplaceString = "$1$3";
export declare function createCommentMatchReplaceStylerRegexString(matchCharsRegexPart: string, matchStyle: React.CSSProperties, replaceString?: string): StyleCreator;
export declare type CommentReplacer = (comment: string) => {
    newComment: string;
    matchStyle: React.CSSProperties;
} | undefined;
export declare function createCommentMatchReplaceStylerFn(commentReplacer: CommentReplacer): StyleCreator;
export interface StringReplaceArgs {
    replace: RegExp | string;
    replaceString?: string;
    matchStyle: React.CSSProperties;
}
export declare type CommentMatchReplaceStyler = CommentReplacer | StringReplaceArgs;
export declare function createCommentMatchReplaceStyler(replacer: CommentMatchReplaceStyler): StyleCreator;
export declare function createMatchNOrMoreRegexPart(matchCharsRegexPart: string, numMatches: number): string;
export declare function createCommentMatchNOrMoreReplaceStyler(matchCharsRegexPart: string, matchStyle: React.CSSProperties, numMatches: number): StyleCreator;
