/// <reference types="react" />
import { CommentTagProps } from "../interceptor";
export declare function getSpacing(tabNumber: number): string;
export declare type CommentTagType<PAdditional = {}> = React.FC<CommentTagProps & PAdditional> & {
    displayName: string;
};
