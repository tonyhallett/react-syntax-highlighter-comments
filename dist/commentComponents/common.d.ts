import * as React from "react";
import { CommentCharsStylingOptions } from "../stylers/commentCharsStyler";
export declare function checkCommentCharsDependency(commentCharsStyingOptions: CommentCharsStylingOptions | undefined, splitCommentChars: boolean): void;
export declare function checkMergeStylesDependency(mergeStyles: boolean | undefined, commentClasses: boolean | undefined): void;
export declare function cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse(child: any, customRenderer: any, style?: any): React.DetailedReactHTMLElement<{
    renderer: any;
    style: any;
    wrapLines: boolean;
}, HTMLElement> | React.FunctionComponentElement<{
    renderer: any;
    wrapLines: boolean;
}>;
