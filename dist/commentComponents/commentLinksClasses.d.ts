import * as React from "react";
import { CommentCharsStylingOptions } from "../stylers/commentCharsStyler";
import { LinkTarget } from '../interceptors/links/commentLinkInterceptor';
export declare const CommentLinksAndClasses: React.FC<{
    mergeStyles?: boolean;
    splitCommentChars?: boolean;
    commentLinks?: boolean;
    linkTarget?: LinkTarget;
    commentRemoval?: boolean | RegExp;
    dollarCommentSplit?: boolean;
    commentCharsStyingOptions?: CommentCharsStylingOptions;
}>;
