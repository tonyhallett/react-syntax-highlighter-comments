import React from "react";
import { EditableRSH } from "react-syntax-highlighter-editable";
import { Prism } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CommentCharsStylingOptions, CommentLinksAndColours } from "../../../src";
import { useLabelCheckbox, useLabelTextbox, useLabelRadios } from "./controlHooks";

const tripleQuestionRemovalRegex = /\?{3}/
export function DemoCommentLinksAndColours(){
  const initialCode=`
// !!! opt in for comment removal
// ??? select Triple ??? Comment Removal to remove this
// ( note that the prop is a RegExp )

// coloured unless opt out of off triple asterisk, 
// provide no color to tripleAsterisk prop and will be red ***

// yellow unless opt out of colourComments #yellow 

// this will be green unless opt in to dollarCommentSplit
// $ blue #blue $$ green #green $

// this is a link unless turn off 
// <https://daringfireball.net/projects/markdown/syntax#autolink>

// this link uses a comment class that need to opt in for
// italic key with style {fontStyle:'italic'} on the SyntaxHighlighter style prop
// {class=italic}<https://daringfireball.net/projects/markdown/syntax#autolink>

// if opt in to comment class and mergeStyles this will be 
// {class=color-limegreen large italic} limegreen, large and italic
/* 
  opt out of split comments to see the 
  styling discrepancy that can be present 
*/

`
  function noCommentColor(color:string){
    return color==='';
  }

  const [colourCommentsCb,colourComments ] = useLabelCheckbox('Colour comments ?')
  const [splitCommentCb,splitComment ] = useLabelCheckbox('Split comments ?')
  const [createLinksCb,createLinks ] = useLabelCheckbox('Create links ?')

  const [dollarSplitCommentsCb,dollarSplitComments ] = useLabelCheckbox('Dollar split comments ?', false)
  const [commentRemovalCb,commentRemoval ] = useLabelCheckbox('Comment removal ?', false)
  const [tripleQuestionRemovalCb,tripleQuestionRemoval ] = useLabelCheckbox('Triple ??? Comment removal ?', false)
  const [commentClassesCb,commentClasses ] = useLabelCheckbox('Comment classes ?', false)
  const [mergeStylesCb,mergeStyles ] = useLabelCheckbox('MergeStyles', false)

  const [tripleAsteriskCb,tripleAsterisk ] = useLabelCheckbox('Triple asterisk ?')
  const [tripleAsteriskColorTb, tripleAsteriskColor] = useLabelTextbox('Colour')
  
  const tripleAsteriskProp = !tripleAsterisk ? false : tripleAsteriskColor === '' ? undefined : tripleAsteriskColor;

  const [singleCommentColorTb, singleCommentColor] = useLabelTextbox('Single line comment colour','blue')
  const [applySingleCb,applySingle ] = useLabelCheckbox('Apply single line ?', true)
  const [multilineStartColorTb, multilineStartColor] = useLabelTextbox('Multiline start comment colour','red')
  const [multilineEndColorTb, multilineEndColor] = useLabelTextbox('Multiline end comment colour','orange')
  const [multilineColorTb, multilineColor] = useLabelTextbox('Multiline comment colour','yellow')
  const [allColorTb, allColor] = useLabelTextbox('All comment chars','skyblue')
  const [multilineRadios, selectedRadio] = useLabelRadios(['Multline off','Multiline separate','Multiline same'],'Multline off')
  function noCommentColors(){
    return noCommentColor(allColor) && noCommentColor(singleCommentColor) && noCommentColor(multilineStartColor) && noCommentColor(multilineEndColor)
  }
  function getCommentColors():CommentCharsStylingOptions{
    return {
      allStyle:noCommentColor(allColor)?undefined:{color:allColor},
      singleLineStyle:(noCommentColor(singleCommentColor)||!applySingle)?undefined:{color:singleCommentColor},
      multilineStartStyle:(noCommentColor(multilineStartColor)||selectedRadio!=='Multiline separate')?undefined:{color:multilineStartColor},
      multilineEndStyle:(noCommentColor(multilineEndColor)||selectedRadio!=='Multiline separate')?undefined:{color:multilineEndColor},
      multilineStyle:(noCommentColor(multilineColor)||selectedRadio!=='Multiline same')?undefined:{color:multilineColor}
    }
  }
  
  return <>
  
  {colourCommentsCb}
  {tripleAsteriskCb}
  {tripleAsteriskColorTb}

  {createLinksCb}
  {splitCommentCb}

  {commentRemovalCb}
  {tripleQuestionRemovalCb}
  
  {dollarSplitCommentsCb}
  
  {commentClassesCb}
  {mergeStylesCb}

  <div>// - props.singleLineStyle or props.allStyle.</div>
  <div>/* - props.multilineStartStyle or props.multilineStyle or props.allStyle.</div>
  <div>/* - props.multilineEndStyle or props.multilineStyle or props.allStyle.</div>
  <div>Play with checkbox and radios, remove the all style to see the precedence.  Change the colours if you wish</div>
  {allColorTb}
  {singleCommentColorTb}
  {applySingleCb}
  {multilineColorTb}
  {multilineStartColorTb}
  {multilineEndColorTb}
  {multilineRadios}

  
  <EditableRSH initialCode={initialCode} rows={4} columns={100} renderSH={
    (code) => <CommentLinksAndColours 
        colourComments={colourComments===true?undefined:false}
        splitCommentChars={splitComment===true?undefined:false}
        commentLinks={createLinks===true?undefined:false}
        tripleAsterisk={tripleAsteriskProp}
        dollarCommentSplit={!dollarSplitComments?undefined:true}
        commentRemoval={!commentRemoval?undefined:tripleQuestionRemoval?tripleQuestionRemovalRegex:true}
        commentClasses={!commentClasses?undefined:true}
        commentCharsStyingOptions={noCommentColors()?undefined:getCommentColors()}
        mergeStyles={mergeStyles}
      >
      <Prism wrapLines={false} language='tsx' style={
      {
        ...atomDark,
        ...
        {
          italic:{fontStyle:'italic'},
        }
      }        
    }>
      {code}
    </Prism>
    </CommentLinksAndColours>
  }/>
  </>

}