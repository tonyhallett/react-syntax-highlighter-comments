import * as React from "react";
import { createCustomRenderer, createChainedStyleCreator, createChainedNodeRenderInterceptor} from "react-syntax-highlighter-renderer-interceptor";
import { createCommentTagInterceptor} from "../interceptors/commentTagInterceptor";
import { createTripleAsteriskCommentColourer} from '../stylers/colourers/tripleAsteriskCommentColourer'
import { commentColourer} from '../stylers/colourers/commentColourer'
import { inlineStyler} from '../stylers/inlineStyler'
import { referenceStyler} from '../stylers/referenceStyler'
import { createNodeObjectPropertyAttacher} from '../interceptors/nodeObjectPropertyAttacher'
import { splitCommentChars as splitCommentCharsInterceptor, dollarCommentSplitter} from '../interceptors/commentSplitters'
import { commentClassProvider} from '../interceptors/commentClassProvider'
import { LinkTarget, createTargetedCommentLinkInterceptor} from '../interceptors/links/commentLinkInterceptor'
import { TypeInterceptorDetails, createTypeInterceptor } from "../interceptors/type/typeInterceptor";
import { CommentMatchReplaceStyler, createCommentRemover } from "..";
import { createCommentMatchReplaceStyler } from "../stylers/styler creators/createCommentMatchReplaceStyler";
import { CommentCharsStylingOptions, createCommentCharsStyler } from "../stylers/commentCharsStyler";
import { mergeStyle } from "./mergeStyle";
import { checkCommentCharsDependency, checkMergeStylesDependency, cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse } from "./common";
import { ComponentProvider } from "../interceptors/commentTagInterceptor/interceptor/types";

export const SyntaxHighlighterComments:React.FC<{
  /**
   * opt in
   */
  commentMatchReplaceStyler?:CommentMatchReplaceStyler,
  /**
   * opt out
   */
  splitCommentChars?:boolean,
  /**
   * opt out
   */
  dollarCommentSplit?:boolean,
  /**
   * opt in
   */
  commentCharsStyingOptions?:CommentCharsStylingOptions,
  /**
   * opt in
   */
  commentTagProvider?:ComponentProvider,
  /**
   * opt out
   */
  respectStyleProp?:boolean,
  /**
   * opt in
   */
  typeInterceptorDetails?:TypeInterceptorDetails[],
  /**
   * opt out
   */
  tripleAsterisk?:boolean|React.CSSProperties['color'],
  /**
   * opt out
   */
  colourComments?:boolean,
  /**
   * opt out
   */
  inlineStyles?:boolean,
  /**
   * opt out
   */
  referenceStyles?:boolean,
  /**
   * opt out
   */
  nodeObjectPropertyAttacher?:boolean,
  /**
   * opt out
   */
  commentRemoval?:boolean|RegExp,
  /**
   * opt out
   */
  commentClasses?:boolean,
  /**
   * opt out
   */
  commentLinks?:boolean,
  /**
   * opt out
   */
  linkTarget?:LinkTarget,
  /**
   * opt out
   */
  mergeStyles?:boolean
}> = ({
    commentMatchReplaceStyler,
    splitCommentChars = true, // opt out
    dollarCommentSplit = true, // opt out
    commentCharsStyingOptions, // opt in
    commentTagProvider, // opt in
    respectStyleProp, // opt out
    typeInterceptorDetails,// opt in
    children,
    tripleAsterisk = true, // opt out
    colourComments = true, // opt out
    inlineStyles = true, // opt out
    referenceStyles = true, //opt out
    nodeObjectPropertyAttacher = true, //opt out
    commentRemoval = /\!{3}/, //opt out
    commentClasses = true, //opt out
    commentLinks = true, //opt out
    linkTarget = '_blank',
    mergeStyles = true //opt out
  }) => {
  if(respectStyleProp!==undefined && commentTagProvider===undefined){
    throw new Error('commentTagProvider is required for respectStyleProp')
  }
  checkCommentCharsDependency(commentCharsStyingOptions,splitCommentChars);
  if(nodeObjectPropertyAttacher === false && referenceStyles!== false){
    throw new Error('nodeObjectPropertyAttacher is required for reference styles');
  }
  const child:React.ReactElement = React.Children.only(children) as any;
  let style = child.props.style;
  checkMergeStylesDependency(mergeStyles,commentClasses);
  if(mergeStyles && commentClasses){
    style ={
      ...style,
      ...mergeStyle
    }
  }
  const addCommentTagInterceptor = child.props.language==='tsx';
  const customRenderer= React.useMemo(()=>{
    
    return createCustomRenderer(
      createChainedStyleCreator(
        tripleAsterisk===false?undefined:createTripleAsteriskCommentColourer(tripleAsterisk===true?'red':tripleAsterisk as string),
        colourComments?commentColourer:undefined,
        inlineStyles?inlineStyler:undefined,
        referenceStyles?referenceStyler:undefined,
        commentCharsStyingOptions?createCommentCharsStyler(commentCharsStyingOptions):undefined,
        commentMatchReplaceStyler?createCommentMatchReplaceStyler(commentMatchReplaceStyler):undefined
      ),
      createChainedNodeRenderInterceptor(
        addCommentTagInterceptor&&commentTagProvider?createCommentTagInterceptor(commentTagProvider,respectStyleProp):undefined,
        nodeObjectPropertyAttacher?createNodeObjectPropertyAttacher():undefined,
        commentRemoval===false?undefined:createCommentRemover(commentRemoval as RegExp),
        splitCommentChars?splitCommentCharsInterceptor:undefined,//order of these does not matter
        typeInterceptorDetails?createTypeInterceptor(...typeInterceptorDetails):undefined,
        dollarCommentSplit?dollarCommentSplitter:undefined,
        
        
        commentClasses?commentClassProvider:undefined,//after the splitting
        commentLinks?createTargetedCommentLinkInterceptor(linkTarget):undefined,//can come before splitting
      )
    );
  },[
    addCommentTagInterceptor,
    commentLinks,
    linkTarget,
    commentClasses,
    dollarCommentSplit,
    colourComments,
    inlineStyles,
    referenceStyles,
    commentTagProvider, 
    respectStyleProp,
    typeInterceptorDetails,
    splitCommentChars, 
    tripleAsterisk,
    nodeObjectPropertyAttacher,
    commentLinks,
    commentCharsStyingOptions,
    commentRemoval,
    commentMatchReplaceStyler
  ])
  
  return cloneSyntaxHighlighterWithCustomRendererStyleAndWrapLinesFalse(child,customRenderer,style);
}