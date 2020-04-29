import * as React from "react";
import { EditableRSH } from "react-syntax-highlighter-editable";
import { Prism, Light } from "react-syntax-highlighter";
import { atomDark as prismStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import { atelierCaveDark as highlightStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { DemoTypeComponent } from "./DemoTypeComponent";
import { useLabelCheckbox, useLabelTextbox } from "./controlHooks";
import { SyntaxHighlighterComments, builtInComponentFinder, HtmlComponents, CommentTagType, PropsPrecedence } from "../../../src/";

const Span = HtmlComponents.span;
const AdditionalProps:CommentTagType<{style?:React.CSSProperties}> = ({style, children, commentStyleProp, respectStyleProp}) => {
return <Span style={style} respectStyleProp={respectStyleProp} commentStyleProp={commentStyleProp} commentDisplay >{children}</Span>
}
AdditionalProps.displayName = 'AdditionalProps';

function getInitialCode(isHighlight:boolean){
  return `/*
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
${isHighlight?'':`/*
  with the commentTagInterceptor you can use a React component that renders 
  nothing when your code is run but will be rendered when passed to 
  react-syntax-highlighter.

  Below are built-in components that work with the commentTagInterceptor.
  You can also provide your own.  Your component  will be rendered with an additional prop commentDisplay equal to true 
  for you to ensure it is only displayed with the react-syntax-highlighter.  It will also be supplied 
  with props respectStyleProp and commentStyleProp.  The respectStyleProp defaults to true and can be 
  set globally as argument to the createCommentTagInterceptor or returned by the ComponentProvider for specific 
  tags.  The commentStyleProp is the css that comes from the comment key of the rsh style prop.  The component 
  can use these two properties for its styling.
  All builtin componets respect the respectStyleProp property appart from CommentStyle 
  which always respects and StyleColor that never respects and just takes the color css property from the 
  style prop comment key.
  You can also attach styleProps property to your component
   ( array or string ) and further style props will be provided.  E.g the CommentLink has displayProps = 'link' 
   and wll receive linkStyleProp.  
  To use the builtin components as a whole you can use exported builtInComponentProvider / builtInComponentFinder.  
  These just import all components and use the displayName that they all have to match against the tag name.
  
  CommentReactIcon will render the react icon.  
  
  $ StyledComment can render a styled multiline $ $ comment #red$ 
  (comment prop string []) or styled single line $ comment #red$ 
  (comment prop string) or child.
  For single line - position with spaces.  For multiline you will need the tab property.
  $ RedComment renders a red $ $ StyledComment. #red$
  $ MultiComment will render the $ $ comment chars #red$ and render children on new lines ( divs).  
  It too has the tab property.
  $ Comment will render $ $ chars // #red $ and render the children elements. 
  StyleColour will render a span styled with the colour from the style prop comment key, if present.
  Coloured renders a span with colour.  There is a component for each css color name - see Skyblue below
  There are components for the fontStyle, fontWeight and fontSize.  There are also many text decoration components 
  that cover all permutations of textDecorationLine, textDecorationStyle and textDecorationColor from the css color names.  
  There is a common naming to these.  For instance the name UlOlLtWavyLimegreen is composed of 
  3 parts the textDecorationLine, textDecorationStyle and then the textDecorationColor.
  UlOlLt means all 3 line decorations.
  Wavy is the style ( if Solid then exclude this part).
  Limegreen is the color used and can be excluded.
  Thus the most minimal is Ul, Ol and Lt.
  For full control there is the TextDecoration component where you can also specify the color to be used.
  The fontStyle, fontWeight, fontSize and textDecoration can all wrap other components.
  
  CommentLink will render a link with full props and styling, it will merge in style from style prop link according to respectStyleProp.
  
  CommentPlaceholder will render it's children.  Its purpose is to hide children from normal render and only 
  render from within react-syntax-highlighter.
  
  
*/
<StyledComment style={{color:'white',backgroundColor:'red'}}>React Icon</StyledComment>
<CommentReactIcon/>
function commentViaTag(){
  <RedComment>this line is important </RedComment><CommentLink linkProps={{href:'https://www.merriam-webster.com/dictionary/important', target:'_blank',style:{color:'hotpink'}}}>for more info</CommentLink>
  const important='very';
  <StyledComment tab={2} comment={['multiline and', 'styled','tab=2']} style={{color:'white',backgroundColor:'red'}}/>
  return important;
}
    
<Comment><Red>This is important</Red><CommentStyle> but this is not</CommentStyle><Orange> and this is orange.</Orange></Comment>
<Comment><CommentStyle>This always uses the style prop ( regardless of respectStyleProp )</CommentStyle><StyleColour> and this never uses it.</StyleColour></Comment>

// in addition to <> it recognises React.Fragment or Fragment
<MultiComment>
  <>
    <Coloured color='#d10a14'>A Red comment </Coloured>
    <Coloured color='#5b2eff'>A Blue comment </Coloured>
    <Skyblue>Sky blue </Skyblue>
    
  </>
  <Coloured color='#2effc4'>A Green comment</Coloured>

  <Italic>Italic</Italic>
  <Lighter>Lighter</Lighter>
  <Bold>Bold</Bold>
  <Bolder>Bolder</Bolder>
  <Bold><Italic><Red>Bold and Italic and red</Red></Italic></Bold>
  <Red><Italic>Italic</Italic><XLarge> and X Large</XLarge></Red>
  <XXSmall>XXSmall</XXSmall>
  <XSmall>XSmall</XSmall>
  <Small>Small</Small>
  <Medium>Medium</Medium>
  <Large>Large</Large>
  <XLarge>X Large</XLarge>
  <XXLarge>XX Large</XXLarge>
  <XXXLarge>XXX Large</XXXLarge>
  <Smaller>Smaller</Smaller>
  <Larger>Larger</Larger>
  <UlOlLtWavyLimegreen>All lines wavy and lime green !</UlOlLtWavyLimegreen>
  <TextDecoration l='ulol' c='#FF4666' s='wavy' th='10px'>Use this for full control</TextDecoration>
</MultiComment>

    <MultiComment tab={4}>
      <>
        <Indianred>Tab</Indianred>
        <Hotpink>=</Hotpink>
        <Gold>4</Gold>
      </>
      <Lime>Set tab to match leading space</Lime>
    </MultiComment>


<span>This is not processed</span>
<CommentPlaceholder><span>But this is</span></CommentPlaceholder>
<Span style={{background:'green'}}>Style prop aware span</Span>
<Div style={{background:'blue'}}>Style prop aware div</Div>


<AdditionalProps style={{color:'red',backgroundColor:'white'}}>Styled based upon mergeObjectProps and propsPrecedence.</AdditionalProps>
`
}
`
}
export function DemoSyntaxHighlighterComments(){
    const [respectStylePropCb, respectStyleProp] = useLabelCheckbox('Respect style prop ?')
    const [respectStylePropRedCb, respectStylePropRed] = useLabelCheckbox('Respect for <Red> ?')
    const [prismCheckbox, isPrism] = useLabelCheckbox('Prism ?')
    const [prismCommentColorTb, prismCommentColor] = useLabelTextbox('Props style comment colour - Prism','white');
    const [lightCommentColorTb, lightCommentColor] = useLabelTextbox('Props style comment colour - Prism','blue');

    const [propsPrecedenceCb, propsPrecedence] = useLabelCheckbox('Instance precedence ?');
    const [mergeObjectPropsCb, mergeObjectProps] = useLabelCheckbox('Merge object props ?');
    
    const key = React.useRef(0);
    const previousIsPrism = React.useRef(isPrism);
    const previousRespectRed = React.useRef(respectStylePropRed);
    if(previousIsPrism.current!==isPrism||previousRespectRed.current!==respectStylePropRed){
      key.current=key.current+1;
    }


    previousIsPrism.current=isPrism;
    previousRespectRed.current  = respectStylePropRed;

    const common = {border:'medium dashed green'}
    //should use these for the description
    const prismStyleComment = {comment:{color:prismCommentColor,...common}};
    const lightStyleComment = {'hljs-comment':{color:lightCommentColor,...common}};
    
    const stylePropComment = isPrism? prismStyleComment:lightStyleComment;
    return <>
    <div>SyntaxHighlighterComments component.  All style creators and render interceptors</div>
    <div>It uses a style replacer function to rotate a comment containing the word upsidedown and removing the word upsidedown.</div>

    
    <div>The comment key of the style prop has been set to have a border and the color you set below.</div>
    {prismCommentColorTb}
    {lightCommentColorTb}
    {respectStylePropCb}
    {respectStylePropRedCb}
    {prismCheckbox}
    
    {propsPrecedenceCb}
    {mergeObjectPropsCb}
    <EditableRSH key={key.current} initialCode={getInitialCode(!isPrism)} rows={40} columns={100} renderSH={
      (code) => {
        const SyntaxHighlighter=isPrism?Prism:Light;
        const baseStyle = isPrism?prismStyle:highlightStyle;
      return <SyntaxHighlighterComments 
        commentMatchReplaceStyler={(comment)=>{
          const replaced = comment.replace('upsidedown','');
          if(replaced!==comment){
            return {
              newComment:replaced,
              matchStyle:{transform:'rotate(180deg)',display:'inline-block'}
            }
          }
        }}
        
        typeInterceptorDetails={[{name:'Demo',component:DemoTypeComponent}]} 
        respectStyleProp={respectStyleProp}
        commentTagProvider={
        (tagName) => {
          if(tagName==='AdditionalProps'){
            return {
              type:AdditionalProps,
              additionalProps:{
                prefix:'Hi',
                style:{
                  color:'blue',
                  fontStyle:'italic'
                }
              },
              propsPrecedence:propsPrecedence?PropsPrecedence.Instance:PropsPrecedence.AdditionalProps,
              mergeObjectProps
            }
          }
          const found = builtInComponentFinder(tagName);
          if(found && tagName === 'Red'){
            return {
              type:found,
              additionalProps:{
                respectStyleProp:respectStylePropRed
              }
            }
          }
          return found;
          
        }
      }><SyntaxHighlighter wrapLines={false} language={isPrism?'tsx':'ts'} style={
        {
          ...baseStyle,
          ...
          {
            yellow:{color:'yellow'},
            italic:{fontStyle:'italic'},
            green:{color:'green'},
            bold:{fontWeight:'bolder'},
            big:{fontSize:'125%'},
            link:{color:'orange'},
          },
          ...stylePropComment
        }
      }>
        {code}
      </SyntaxHighlighter></SyntaxHighlighterComments>}
    }/>
    </>
}