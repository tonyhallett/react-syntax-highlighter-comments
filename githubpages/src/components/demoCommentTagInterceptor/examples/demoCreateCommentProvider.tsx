import React from "react"
import Typography from '@material-ui/core/Typography';
import { Em33Container } from "../../common"
import { ExampleCode } from "./common";
import { 
  createComponentProvider, 
  FontComponents as F} 
  from "../../../../../src";
import { Prism } from "react-syntax-highlighter";

export const DemoCreateCommentProvider:React.FC = ()=> {
  const code = `
  import {FontComponents as F} from 'react-syntax-highlighter-comments';
  type Italic = typeof F.Italic

  <Italic>Italic</Italic>
  <F.Italic>Italic</F.Italic>
  `
  const createComponentProviderCode = `
  import {
    createCommentTagInterceptor, 
    createComponentProvider, 
    FontComponents} 
    from 'react-syntax-highlighter-comments';
  const commentTagInterceptor = createCommentTagInterceptor(createComponentProvider([FontComponents.Italic]));
  // use in <SyntaxHighlighterComments> or manually in createCustomRenderer from react-syntax-highlighter-renderer-interceptor
  `
  return <>
    <Em33Container>
      <Typography gutterBottom>There are 4 functions to assist with matching tag names against component types.</Typography>
      <Typography gutterBottom>If you are just using the built in components then you can use one of builtInComponentProvider or builtInComponentFinder if you need to supply additionalProps.</Typography>
      <Typography gutterBottom>If you are using your own components then you can use createComponentProvider or createComponentFinder.  The createComponentFinder function is for use in your own ComponentProvider</Typography>
      <Typography gutterBottom>Finding logic:</Typography>
      <Typography gutterBottom>Is a case insensitive match against the displayName.  If the tagName is of the form Thing.Tag then Tag will be compared against the displayName.</Typography>
    </Em33Container>
    <Prism language='ts'>
      {createComponentProviderCode}
    </Prism>
    <ExampleCode
      commentTagProvider={createComponentProvider([F.Italic])}
    >{code}</ExampleCode>
  </>
}