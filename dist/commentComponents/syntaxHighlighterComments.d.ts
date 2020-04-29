import * as React from "react";
import { LinkTarget } from '../interceptors/links/commentLinkInterceptor';
import { TypeInterceptorDetails } from "../interceptors/type/typeInterceptor";
import { CommentMatchReplaceStyler } from "..";
import { CommentCharsStylingOptions } from "../stylers/commentCharsStyler";
import { ComponentProvider } from "../interceptors/commentTagInterceptor/interceptor/types";
export declare const SyntaxHighlighterComments: React.FC<{
    /**
     * opt in
     */
    commentMatchReplaceStyler?: CommentMatchReplaceStyler;
    /**
     * opt out
     */
    splitCommentChars?: boolean;
    /**
     * opt out
     */
    dollarCommentSplit?: boolean;
    /**
     * opt in
     */
    commentCharsStyingOptions?: CommentCharsStylingOptions;
    /**
     * opt in
     */
    commentTagProvider?: ComponentProvider;
    /**
     * opt out
     */
    respectStyleProp?: boolean;
    /**
     * opt in
     */
    typeInterceptorDetails?: TypeInterceptorDetails[];
    /**
     * opt out
     */
    tripleAsterisk?: boolean | React.CSSProperties['color'];
    /**
     * opt out
     */
    colourComments?: boolean;
    /**
     * opt out
     */
    inlineStyles?: boolean;
    /**
     * opt out
     */
    referenceStyles?: boolean;
    /**
     * opt out
     */
    nodeObjectPropertyAttacher?: boolean;
    /**
     * opt out
     */
    commentRemoval?: boolean | RegExp;
    /**
     * opt out
     */
    commentClasses?: boolean;
    /**
     * opt out
     */
    commentLinks?: boolean;
    /**
     * opt out
     */
    linkTarget?: LinkTarget;
    /**
     * opt out
     */
    mergeStyles?: boolean;
}>;
