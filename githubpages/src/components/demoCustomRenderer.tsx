import * as React from "react";
import { EditableRSH } from "react-syntax-highlighter-editable";
import { Prism, Light } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { atelierPlateauDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { createCustomRenderer, createChainedStyleCreator, createChainedNodeRenderInterceptor } from "react-syntax-highlighter-renderer-interceptor";
import { redTripleAsteriskCommentColourer, commentColourer, inlineStyler, referenceStyler, createCommentTagInterceptor, createNodeObjectPropertyAttacher, tripleExclamationCommentRemover, splitCommentChars, createTypeInterceptor, dollarCommentSplitter, commentClassProvider, commentLinkInterceptorTargetBlank, builtInComponentProvider } from "../../../src";
import { DemoTypeComponent } from "./DemoTypeComponent";

const prismCustomRenderer = (function(){
  return createCustomRenderer(
    createChainedStyleCreator(
      redTripleAsteriskCommentColourer,
      commentColourer,
      inlineStyler,
      referenceStyler,
    ),
    createChainedNodeRenderInterceptor(
      createCommentTagInterceptor(builtInComponentProvider),
      createNodeObjectPropertyAttacher(),
      tripleExclamationCommentRemover,// first before splitting
      
      splitCommentChars,//order of these does not matter
      createTypeInterceptor({name:'Demo',component:DemoTypeComponent}),//before the dollar comment splitter
      dollarCommentSplitter,
      
      
      commentClassProvider,//after the splitting
      commentLinkInterceptorTargetBlank,//can come before splitting
    )
)})();

const hljsCustomRenderer = (function(){
  return createCustomRenderer(
    createChainedStyleCreator(
      redTripleAsteriskCommentColourer,
      commentColourer,
      inlineStyler,
      referenceStyler,
    ),
    createChainedNodeRenderInterceptor(
      createNodeObjectPropertyAttacher(),
      tripleExclamationCommentRemover,// first before splitting
      
      splitCommentChars,//order of these does not matter
      createTypeInterceptor({name:'Demo',component:DemoTypeComponent}),//before the dollar comment splitter
      dollarCommentSplitter,
      
      
      commentClassProvider,//after the splitting
      commentLinkInterceptorTargetBlank,//can come before splitting
    )
)})();


const commentCode =`/*
  ~[refStyle]{
    "color": {
      "color":"red"
    },
    "fontsize": {
      "fontSize":"125%"
    }
  }
*/
// %color fontsize%this is red and big using referenceStyler
/*
   this is lime green with a red text shadow ^
    {
      "color":"limegreen",
      "textShadow":" 5px 1px 1px red"
    }
  ^
   using an inline style 
*/

// this is yellow and italic by using commentClassInterceptor {class=yellow italic}

// commentColourer with hsla hsla(0,100%,50%,0.6) 
// commentColourer rgb rgb(255,105,180) 
/* commentColourer hex #ffa500*/ /*#DF5286 commentColourer hex  */
// commentColourer color name #skyblue

// using redTripleAsteriskCommentColourer - this is red as has 3 asterisks ***
// * this single asterisk is ignored

// $ this is split with dollarCommentSplitter #45b6fe $ $ comment #1c4966 $
// and so is below
/* 
  $ this is yellow and italic {class=yellow italic} $ $ yellow and bold {class=yellow bold} $ $ green
  and big {class=green big} $
*/

// below will be upside down for component with custom commentMatchReplaceStyler prop
// upside down upsidedown

/*
   with the commentLinkInterceptor you can have
   [github flavour title links - see Links](https://guides.github.com/features/mastering-markdown/)
   or use angle brackets $ {class=italic}
   <https://daringfireball.net/projects/markdown/syntax#autolink>$
   both links styled with the link class and the last has
   own style using the commentClassInterceptor
*/

/*
  Below we have a custom component created with the typeInterceptor.
  Change color,customMessage,displayCustomMessage,fontSize,
  additionalMessages props to see immediate change.
  Provide additional messages as a string array. 
  Note that when the object is malformed - e.g 
  displayCustomMessage = tru the component will not be displayed
  and the comment will be treated as text
  To see the change in the animation caused by a change to the props 
  animationCSS or @keyframes, change the id and change back to demo. 
  &Demo{
  "id":"demo",
  color:"red",
  customMessage:'Hello from custom component',
  displayCustomMessage:true,
  fontSize:0b1111,
  additionalMessages:[],
  "animationCss":\`#demo {
    animation-duration: 3s;
    animation-name: fontsize;
    animation-direction: alternate;
  }\`,
  "keyframesAnimation":\`
  @keyframes fontsize {
    from {
      font-size: 100%
    }
    to {
      font-size: 150%;
    }
  }\`
}&
*/
/*
   The typeInterceptor can also create react elements
   &a{href:"https://www.bbc.com",children:"the bbc"}&
*/
//!!! Comments with hex codes are for the react-syntax-highlighter
/*
  !!! Comments with hex codes are for the react-syntax-highlighter
*/
function myFunction(x:any/* !!! remove this */){
//!!! Comments with hex codes are for the react-syntax-highlighter
  //this function had comments on the parameter and above this line 
  //removed by tripleExclamationCommentRemover !
}
/*
  with the commentTagInterceptor you can use a React component that renders nothing
  when your code is run but will be rendered when passed to react-syntax-highlighter.
  Below are some built-in components.  You can also provide your own.  Your component 
  will be rendered with an additional prop display equal to true.
*/
<RSHReactIcon/>
function commentViaTag(){
  <RSHRedComment comment='this line is important '/><RSHLink linkProps={{href:'https://www.merriam-webster.com/dictionary/important', target:'_blank'}}>for more info</RSHLink>
  const important='very';
<RSHStyledComment comment={['multiline and', 'styled']} style={{color:'white',backgroundColor:'red'}}/>
  return important;
}
<RSHMultilineComment>
  <RSHFragment>
    <RSHColoured color='red'>A Red comment</RSHColoured>
    <RSHColoured color='blue'>A Blue comment</RSHColoured>
  </RSHFragment>
  <RSHColoured color='green'>A Green comment</RSHColoured>
</RSHMultilineComment>
<RSHMultilineComment>
  <span>
    <RSHColoured color='red'>A Red comment</RSHColoured>
    <RSHColoured color='blue'>A Blue comment</RSHColoured>
  </span>
  <RSHColoured color='green'>A Green comment</RSHColoured>
</RSHMultilineComment>
<RSHMultilineComment>
  <>
    <RSHColoured color='red'>A Red comment</RSHColoured>
    <RSHColoured color='blue'>A Blue comment</RSHColoured>
  </>
  <RSHColoured color='green'>A Green comment</RSHColoured>
</RSHMultilineComment>
<RSHMultilineComment>
  <React.Fragment>
    <RSHColoured color='red'>A Red comment</RSHColoured>
    <RSHColoured color='blue'>A Blue comment</RSHColoured>
  </React.Fragment>
  <RSHColoured color='green'>A Green comment</RSHColoured>
</RSHMultilineComment>
<RSHMultilineComment>
  <Fragment>
    <RSHColoured color='red'>A Red comment</RSHColoured>
    <RSHColoured color='blue'>A Blue comment</RSHColoured>
  </Fragment>
  <RSHColoured color='green'>A Green comment</RSHColoured>
</RSHMultilineComment>

<span>This is not processed</span>
`
const commentCodeNoTSX =`/*
  ~[refStyle]{
    "color": {
      "color":"red"
    },
    "fontsize": {
      "fontSize":"125%"
    }
  }
*/
// %color fontsize%this is red and big using referenceStyler
/*
   this is lime green with a red text shadow ^
    {
      "color":"limegreen",
      "textShadow":" 5px 1px 1px red"
    }
  ^
   using an inline style 
*/

// this is yellow and italic by using commentClassInterceptor {class=yellow italic}

// commentColourer with hsla hsla(0,100%,50%,0.6) 
// commentColourer rgb rgb(255,105,180)
/* commentColourer hex #ffa500 */ /*#DF5286 commentColourer hex  */
// commentColourer color name #skyblue

// using redTripleAsteriskCommentColourer - this is red as has 3 asterisks ***
// * this single asterisk is ignored

// $ this is split with dollarCommentSplitter #45b6fe $ $ comment #1c4966 $
// and so is below
/* 
  $ this is yellow and italic {class=yellow italic} $ $ yellow and bold {class=yellow bold} $ $ green
  and big {class=green big} $
*/

/*
   with the commentLinkInterceptor you can have
   [github flavour title links - see Links](https://guides.github.com/features/mastering-markdown/)
   or use angle brackets $ {class=italic}
   <https://daringfireball.net/projects/markdown/syntax#autolink>$
   both links styled with the link class and the last has
   own style using the commentClassInterceptor
*/

/*
  Below we have a custom component created with the typeInterceptor.
  Change color,customMessage,displayCustomMessage,fontSize,
  additionalMessages props to see immediate change.
  Provide additional messages as a string array. 
  Note that when the object is malformed - e.g 
  displayCustomMessage = tru the component will not be displayed
  and the comment will be treated as text
  To see the change in the animation caused by a change to the props 
  animationCSS or @keyframes, change the id and change back to demo. 
  &Demo{
  "id":"demo",
  color:"red",
  customMessage:'Hello from custom component',
  displayCustomMessage:true,
  fontSize:0b1111,
  additionalMessages:[],
  "animationCss":\`#demo {
    animation-duration: 3s;
    animation-name: fontsize;
    animation-direction: alternate;
  }\`,
  "keyframesAnimation":\`
  @keyframes fontsize {
    from {
      font-size: 100%
    }
    to {
      font-size: 150%;
    }
  }\`
}
&*/
/*
   The typeInterceptor can also create react elements
   &a{href:"https://www.bbc.com",children:"the bbc"}&
*/
//!!! Comments with hex codes are for the react-syntax-highlighter
/*
  !!! Comments with hex codes are for the react-syntax-highlighter
*/
function myFunction(x:any/* !!! remove this */){
//!!! Comments with hex codes are for the react-syntax-highlighter
  //this function had comments on the parameter and above this line 
  //removed by tripleExclamationCommentRemover !
}`

export function DemoCustomRenderer(){
  return <>
    <div>This works by using the renderer prop - Prism. Comment base colouring using the style prop.</div>
    <EditableRSH initialCode={commentCode} rows={40} columns={100} renderSH={
      (code) => <Prism wrapLines={false} language='tsx' style={
        {
          ...atomDark,
          ...
          {
            yellow:{color:'yellow'},
            italic:{fontStyle:'italic'},
            green:{color:'green'},
            bold:{fontWeight:'bolder'},
            big:{fontSize:'125%'},
            link:{color:'orange'},
            comment:{color:'white'}
          }
        }
      } renderer={prismCustomRenderer}>
        {code}
      </Prism>
    }/>
    <div>This works by using the renderer prop - Light. No commentTagInterceptor as tsx is not a supported language</div>
    <EditableRSH initialCode={commentCodeNoTSX} rows={40} columns={100} renderSH={
      (code) => <Light wrapLines={false} language='ts' style={
        {
          ...atelierPlateauDark,
          ...
          {
            yellow:{color:'yellow'},
            italic:{fontStyle:'italic'},
            green:{color:'green'},
            bold:{fontWeight:'bolder'},
            big:{fontSize:'125%'},
            link:{color:'orange'}
          }
        }
      } renderer={hljsCustomRenderer}>
        {code}
      </Light>
    }/>
  </>
}