/// <reference types="react" />
export interface CommentCharsStylingOptions {
    singleLineStyle?: React.CSSProperties;
    multilineStartStyle?: React.CSSProperties;
    multilineEndStyle?: React.CSSProperties;
    multilineStyle?: React.CSSProperties;
    allStyle?: React.CSSProperties;
}
export declare const createCommentCharsStyler: (stylingOptions: CommentCharsStylingOptions) => import("react-syntax-highlighter-renderer-interceptor").StyleCreator;
