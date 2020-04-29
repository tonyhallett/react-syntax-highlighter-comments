import React from "react"
import { EditableRSH } from "react-syntax-highlighter-editable"
import { Prism } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { CommentLinksAndClasses } from "../../../src"
import { useLabelCheckbox } from "./controlHooks"

export function DemoCommentLinksAndClasses(){
  const [mergeStylesCb,mergeStyles ] = useLabelCheckbox('Merge Styles ?')
  const initialCode=`
  // all of below have been merged in to RSH style prop
  // this is orange color ( and all css color names) {class=color-orange}
  // this is red background and green color ( and all css color names) {class=bgcolor-red color-green} 
  
  // this is italic ( there is oblique too) {class=italic} 
  
  // this is lighter ( also bold, bolder ) {class=lighter} 
  
  // this is smaller ( and larger ) {class=smaller} 
  // this is xx-small ( and x-small, small, medium, large, x-large, xx-large, xxx-large) {class=xx-small} 
  

  // this is underline ( and {class=td-underline} 
  // td-overline, td-line-through,td-underline-overline, 
  // td-underline-line-through, td-overline-line-through 
  // and td-underline-overline-line-through) 

  // this is wavy ( and double, dotted, dashed) {class=td-underline td-wavy} 
  
  // this is red ( and all css color names) {class=td-underline-overline td-double td-color-indianred} 
  
  // this has been provided on the style prop  {class=onstyleprop}

  // this is a link unless turn off 
  // <https://daringfireball.net/projects/markdown/syntax#autolink>
  `
  
  return <>
    {mergeStylesCb}
    <EditableRSH initialCode={initialCode} rows={4} columns={100} renderSH={
      (code) => <CommentLinksAndClasses mergeStyles={mergeStyles}>
        <Prism wrapLines={false} language='tsx' style={
        {
          ...atomDark,
          ...
          {
            onstyleprop:{
              border:'4mm ridge rgba(170, 50, 220, .6)'
            },
          }
        }        
      }>
        {code}
      </Prism>
    </CommentLinksAndClasses>
  }/></>
}
