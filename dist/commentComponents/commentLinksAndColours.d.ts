import * as React from "react";
import { LinkTarget } from "../interceptors/links/commentLinkInterceptor";
import { CommentCharsStylingOptions } from "../stylers/commentCharsStyler";
export declare const CommentLinksAndColours: React.FC<{
    children: React.ReactNode;
    colourComments?: boolean;
    tripleAsterisk?: boolean | React.CSSProperties['color'];
    commentLinks?: boolean;
    linkTarget?: LinkTarget;
    splitCommentChars?: boolean;
    commentRemoval?: boolean | RegExp;
    dollarCommentSplit?: boolean;
    commentClasses?: boolean;
    mergeStyles?: boolean;
    commentCharsStyingOptions?: CommentCharsStylingOptions;
}>;
