import { StyledCommentProps } from "./StyledComment";
import { CommentTagType } from './common';
export declare type RedCommentProps = Omit<StyledCommentProps, 'style'>;
export declare const RedComment: CommentTagType<RedCommentProps>;
