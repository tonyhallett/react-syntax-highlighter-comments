import * as React from "react";
import { createCustomRenderer,  createChainedStyleCreator, createChainedNodeRenderInterceptor} from "react-syntax-highlighter-renderer-interceptor";
import { LinkTarget, createTargetedCommentLinkInterceptor} from "../interceptors/links/commentLinkInterceptor"
import { createCommentRemover } from "../interceptors/removal/commentRemover"
import { commentColourer } from "../stylers/colourers/commentColourer"
import { createTripleAsteriskCommentColourer } from "../stylers/colourers/tripleAsteriskCommentColourer"
import { splitCommentChars as splitCommentCharsInterceptor, dollarCommentSplitter} from '../interceptors/commentSplitters'
import { commentClassProvider } from "../interceptors/commentClassProvider";
import { CommentCharsStylingOptions, createCommentCharsStyler } from "../stylers/commentCharsStyler";
import { mergeStyle } from "./mergeStyle";
import { checkCommentCharsDependency, checkMergeStylesDependency, cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse } from "./common";

export const CommentLinksAndColours:React.FC<{
  children:React.ReactNode

  colourComments?:boolean, // opt out
  tripleAsterisk?:boolean|React.CSSProperties['color'], // opt out
  commentLinks?:boolean, // opt out
  linkTarget?:LinkTarget, // default TargetBlank
  splitCommentChars?:boolean, // opt out

  commentRemoval?:boolean|RegExp, // opt in
  dollarCommentSplit?:boolean, // opt in
  commentClasses?:boolean, // opt in
  mergeStyles?:boolean, // opt in
  commentCharsStyingOptions?:CommentCharsStylingOptions, // opt in
}> = ({
    children, 
    colourComments = true, 
    tripleAsterisk = true, 
    commentLinks = true, 
    linkTarget = '_blank',
    splitCommentChars = true, 
    commentRemoval, 
    dollarCommentSplit, 
    commentClasses, 
    mergeStyles, 
    commentCharsStyingOptions})=>{

  checkCommentCharsDependency(commentCharsStyingOptions,splitCommentChars);
  checkMergeStylesDependency(mergeStyles, commentClasses)
  const child:React.ReactElement = React.Children.only(children) as any;
  let style = child.props.style;
  if(mergeStyles&&commentClasses){
    style ={
      ...style,
      ...mergeStyle
    }
  }
  const customRenderer= React.useMemo(()=>{
    return createCustomRenderer(
      createChainedStyleCreator(
        tripleAsterisk?createTripleAsteriskCommentColourer(typeof tripleAsterisk === 'string'?tripleAsterisk:'red'):undefined,
        colourComments?commentColourer:undefined,
        commentCharsStyingOptions?createCommentCharsStyler(commentCharsStyingOptions):undefined,
      ),
      createChainedNodeRenderInterceptor(
        commentRemoval?createCommentRemover(commentRemoval===true?/\!{3}/:commentRemoval):undefined,
        splitCommentChars?splitCommentCharsInterceptor:undefined,
        dollarCommentSplit?dollarCommentSplitter:undefined,
        commentClasses?commentClassProvider:undefined,
        commentLinks?createTargetedCommentLinkInterceptor(linkTarget):undefined,
      )
    );
  },[colourComments, tripleAsterisk,commentLinks,linkTarget,commentRemoval, splitCommentChars, dollarCommentSplit, commentClasses, commentCharsStyingOptions])
  
  return cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse(child,customRenderer,style);
}