import * as React from "react";
import { createCustomRenderer } from "react-syntax-highlighter-renderer-interceptor";
import { CommentMatchReplaceStyler, createCommentMatchReplaceStyler } from "../stylers/styler creators/createCommentMatchReplaceStyler";
import { cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse } from "./common";

export const SyntaxHighlighterStyledComments:React.FC<{replacer:CommentMatchReplaceStyler}> = ({children,replacer}) => {
  const child:React.ReactElement = React.Children.only(children) as any;

  const customRenderer= React.useMemo(()=>{
    return createCustomRenderer(
      createCommentMatchReplaceStyler(replacer)
    );
  },[replacer])
  
  return cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse(child,customRenderer);
}