import * as React from "react";
import { EditableRSH } from "react-syntax-highlighter-editable";
import { SyntaxHighlighterStyledComments } from "../../../src";
import { Prism } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const styledCommentCode =`
// change me
// but not here
`
const styledRegexCode =`
// replacing h*llo with hi and styling
// hello world
`

export function DemoStyledComments(){
  return <><
    div>SyntaxHighlighterStyledComments component, replacer prop function</div>
    <EditableRSH initialCode={styledCommentCode} rows={4} columns={100} renderSH={
      (code) => <SyntaxHighlighterStyledComments replacer={
        (comment)=>{
          if(comment.indexOf('change me')!==-1){
            return {
              newComment:'// replaced by fn !',
              matchStyle:{
                color:'limegreen'
              }
            }
          }
        }
      }><Prism wrapLines={false} language='tsx' style={
        atomDark        
      }>
        {code}
      </Prism></SyntaxHighlighterStyledComments>
    }/>
    <div>SyntaxHighlighterStyledComments component, replacer prop string replace args and match style</div>
    <EditableRSH initialCode={styledRegexCode} rows={4} columns={100} renderSH={
      (code) => <SyntaxHighlighterStyledComments replacer={{
        matchStyle:{color:'orange', backgroundColor:'white'},
        replace:'hello',replaceString:'hi'
      }}><Prism wrapLines={false} language='tsx' style={
        atomDark        
      }>
        {code}
      </Prism></SyntaxHighlighterStyledComments>
    }/>
    </>
}
    