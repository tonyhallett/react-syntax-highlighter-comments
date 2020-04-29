import * as React from "react";
import { CommentTagType } from "./common";
export declare type StyledCommentProps = {
    tab?: number;
    style?: React.CSSProperties;
    comment?: string | string[];
};
export declare const StyledComment: CommentTagType<StyledCommentProps>;
