import * as React from "react";
import Typography from '@material-ui/core/Typography';
import { ComponentApi, InterceptorApi, Expandable } from "../common";
import { DemoCommentReactIcon } from "./examples/demoCommentReactIcon";

function getInitialCode(){
  return `
/*
  
  Below are built-in components that work with the commentTagInterceptor.
  
  All builtin components respect the respectStyleProp property apart from CommentStyle 
  which always respects and StyleColor that never respects and just takes the color css property from the 
  style prop comment key.

  You can also attach styleProps property to your component
  CommentLink has displayProps = 'link'  and wll receive linkStyleProp.

  
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
};

function Introduction(){
  return <Expandable header='Introduction'>
    <Typography>
      The comment tag interceptor is available in Prism only as Light does not support the languages jsx and tsx.
    </Typography>
    <Typography gutterBottom>
      This interceptor is different to all of the others as it works with actual React components and not special syntax embedded in to comments. 
      When a tag is encountered the component provider is asked for the corresponding react component type to be rendered. 
      By designing your components in a particular way you can embed a React component in your code that will only be rendered when used 
      within react-syntax-highlighter when used with the comment tag interceptor or the SyntaxHighlighterComments component. 
    </Typography>
    <Typography variant="h4" gutterBottom>
      CommentDisplay prop
    </Typography>
    <Typography gutterBottom>
      The comment tag interceptor adds additional properties to the components that it creates.  One of these is the commentDisplay prop which is 
      set to true.  By designing components that render only when commentDisplay is true your components will only be viewable within the 
      react-syntax-highlighter when used with the comment tag interceptor or the SyntaxHighlighterComments component.
    </Typography>
    <Typography variant="h4" gutterBottom>
      Styling - respectStyleProp and commentStyleProp
    </Typography>
    <Typography gutterBottom>
      The comment tag interceptor, like all interceptors, has access to the react-syntax-highlighter style prop.  It provides the comment key value from 
      this as the commentStyleProp.  Your component can choose to use it as part of its own styling.  The respectStyleProp is an indicator to the component 
      whether it should if it makes sense to do so.  The respectStyleProp comes from the globalRespectStyleProp argument of the comment tag interceptor which defaults 
      to true, or can come from the ComponentProvider and be set on a component type basis.
    </Typography>
    <Typography variant="h4" gutterBottom>
      Other style keys
    </Typography>
    <Typography gutterBottom>
      If your component type has a styleProps property of type string or string array then it will received additional props with values from the 
      react-syntax-highlighter style prop in a similar manner to the comment prop.  If styleProps is link then your component will receive a linkStyleProp.
    </Typography>
    <Typography variant="h4" gutterBottom>
      Additional props for all instances
    </Typography>
    <Typography gutterBottom>
      The ComponentProvider, in addition to returning the component type, can provide additional props for those tags encountered 
      in the code string.  The additionalProps property is also where you set the respectStyleProp for a particular component type.
    </Typography>
    <Typography variant="h4" gutterBottom>
      Precedence and object merging
    </Typography>
    <Typography gutterBottom>
      How these additional props appear on an instance is determined by the propsPrecedence and mergeObjectProps properties.  By default precedence 
      is Instance and mergeObjectProps is true.  This will result in any props on the Instance taking precedence over the addition props.  
      Non object props in additionalProps will be ignored and for object props they are merged in.  Where properties exist on the instance object 
      and the object from the additonalProps, again the instance property will take precedence.  With merging you can supply some additional styling 
      in the CommentProvider.
    </Typography>
    <Typography variant="h4" gutterBottom>
      Built in components
    </Typography>
    <Typography gutterBottom>
      There are built in style prop aware components that can be used.  There are components for single line and multiline comments, components 
      for colours and general styling, a link component, a React icon and components for font styling.  There is a placeholder component  
      for managing commentDisplay and you can render html elements as children.  Although if you do that you lose access to the react-syntax-highlighter 
      style prop.  Due to this there are style prop aware versions of all the html element tags.
    </Typography>
    <Typography variant="h4" gutterBottom>
      builtInComponentProvider / builtInComponentFinder
    </Typography>
    <Typography gutterBottom>
      You can import the components that are in the code string and return them in the ComponentProvider ( use the displayName for matching aginst the tagName) or you can you use the 
      builtInComponentProvider which imports all components and returns the component with displayName equal to the tagName.
      If you are supply additional props then you can use the builtInCoponentFinder to return the component type.
    </Typography>
    <Typography variant="h4" gutterBottom>
      Limitations
    </Typography>
    <Typography gutterBottom>
      If the code string is generated from actual code then there are limitations to where a tag can appear.  A tag cannot be used 
      alongside a parameter nor inside a class where a class member is expected.  A possible solutionto this is fake decorators....
    </Typography>
    <Typography variant="h4" gutterBottom>
      Examples
    </Typography>
    <Typography gutterBottom>
      Examples follow the API to illustrate the concepts and the built in components.
    </Typography>
  </Expandable>
}

function CommentTagInterceptorApi(){
  const api = `
  export interface RespectStyleProp{
    respectStyleProp?:boolean // on a type basis.  Overrides globalRespectStyleProp
  }
  export type AdditionalProps = RespectStyleProp & Record<string,any>

  export enum PropsPrecedence { Instance /* default */, AdditionalProps}
  
  export interface ComponentTypeWithProps {
    type:React.ComponentType,

    /*
      the resulting props on the instance ( props defined on the instance and additionalProps )
      are determined by the propsPrecedence and mergeObjectProps
    */
    additionalProps:AdditionalProps, 
    propsPrecedence?:PropsPrecedence, // default Instance
    mergeObjectProps?:boolean // default true
  }

  /*
    if no additional props are to be added or respectStyleProp is not required
    then just return the type to be rendered
  */
  export type ComponentTypeOrWithProps = React.ComponentType|ComponentTypeWithProps
  
  // return the type to be rendered ( see builtInComponentProvider for use with built in components)
  export interface ComponentProvider{
    (tagName:string):ComponentTypeOrWithProps|undefined;
  }
  
  export const createCommentTagInterceptor = (componentProvider:ComponentProvider, globalRespectStyleProp=true):NodeRenderInterceptor
  `
  
  return <InterceptorApi>
    {api}
  </InterceptorApi>
}

function CommentTagInterceptorComponentAPI(){
  const props = `
  interface SyntaxHighlighterCommentsProps{
    commentTagProvider?:ComponentProvider,
    respectStyleProp?:boolean,// default true
  }
  `
return <ComponentApi>{props}</ComponentApi>
}

function Demos(){
  return <Expandable header='Demos'>
    <>
      <BuiltInComponentsDemos/>
    </>
    </Expandable>
}
function BuiltInComponentsDemos(){
  return <Expandable header='Built in components'>
    <>
      <Expandable header='CommentReactIcon'>
        <DemoCommentReactIcon/>
      </Expandable>
      
    </>
  </Expandable>
}

export function DemoCommentTagInterceptor(){
  return <>
    <Introduction/>
    <CommentTagInterceptorApi/>
    <CommentTagInterceptorComponentAPI/>
    <Demos/>
  </>
}

