import * as React from "react";
import { createCustomRenderer, createChainedNodeRenderInterceptor} from "react-syntax-highlighter-renderer-interceptor";
import { createTargetedCommentLinkInterceptor} from "../interceptors/links/commentLinkInterceptor"
import { createCommentRemover } from "../interceptors/removal/commentRemover"
import {splitCommentChars as splitCommentInterceptor, dollarCommentSplitter} from '../interceptors/commentSplitters'
import { commentClassProvider } from "../interceptors/commentClassProvider";
import { CommentCharsStylingOptions, createCommentCharsStyler } from "../stylers/commentCharsStyler";
import { mergeStyle } from "./mergeStyle";
import { checkCommentCharsDependency, cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse } from "./common";
import { LinkTarget} from '../interceptors/links/commentLinkInterceptor'

export const CommentLinksAndClasses:React.FC<{
  mergeStyles?:boolean, // opt out
  splitCommentChars?:boolean, // opt out
  commentLinks?:boolean, // opt out
  linkTarget?:LinkTarget, // default TargetBlank
  commentRemoval?:boolean|RegExp, // opt in
  dollarCommentSplit?:boolean, // opt in
  commentCharsStyingOptions?:CommentCharsStylingOptions, // opt in
}>  = ({mergeStyles = true,commentRemoval, dollarCommentSplit,splitCommentChars = true, children, commentCharsStyingOptions, commentLinks = true, linkTarget = '_blank'}) => {
  checkCommentCharsDependency(commentCharsStyingOptions,splitCommentChars);
  const child:React.ReactElement = React.Children.only(children) as any;
  let style = child.props.style;
  if(mergeStyles){
    style ={
      ...style,
      ...mergeStyle
    }
  }
  const customRenderer= React.useMemo(()=>{
    return createCustomRenderer(
      commentCharsStyingOptions?createCommentCharsStyler(commentCharsStyingOptions):undefined,
      createChainedNodeRenderInterceptor(
        commentRemoval?createCommentRemover(commentRemoval===true?/\!{3}/:commentRemoval):undefined,
        splitCommentChars?splitCommentInterceptor:undefined,
        dollarCommentSplit?dollarCommentSplitter:undefined,
        commentClassProvider,
        commentLinks?createTargetedCommentLinkInterceptor(linkTarget):undefined,  
      )
    );
  },[mergeStyles,commentRemoval,dollarCommentSplit, splitCommentChars, commentCharsStyingOptions, commentLinks, linkTarget])
  
  return cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse(child,customRenderer,style);
}