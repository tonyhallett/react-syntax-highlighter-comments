import * as React from "react";
import { createCustomRenderer } from "react-syntax-highlighter-renderer-interceptor";
import {createTripleAsteriskCommentColourer} from '../stylers/colourers/tripleAsteriskCommentColourer'
import { cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse } from "./common";
export const SyntaxHighlighterXXXComments:React.FC<{color?:React.CSSProperties['color']}> = ({color,children}) => {
  const child:React.ReactElement = React.Children.only(children) as any;

  const customRenderer= React.useMemo(()=>{
    return createCustomRenderer(
      createTripleAsteriskCommentColourer(color?color:'red')
      );
  },[color])
  
  return cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse(child,customRenderer);
}