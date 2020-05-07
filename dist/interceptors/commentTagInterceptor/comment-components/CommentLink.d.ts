import * as React from "react";
import { CommentTagType } from "./common";
declare type LinkProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
export declare const CommentLink: CommentTagType<{
    linkStyleProp?: React.CSSProperties;
} & LinkProps>;
export {};
