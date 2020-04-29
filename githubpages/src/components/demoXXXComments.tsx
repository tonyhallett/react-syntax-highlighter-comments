import * as React from "react";
import { EditableRSH } from "react-syntax-highlighter-editable";
import { Prism } from "react-syntax-highlighter";
import { duotoneLight, atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { SyntaxHighlighterComments, SyntaxHighlighterXXXComments } from "../../../src";

const tripleAsteriskRedCode = `
// *** this is coloured red ( by default )
// this is not
`

const tripleAsteriskPropCode = `
// *** this is coloured orange by using the color prop
// this is not
`

const example1 = `
// * x 3 = red #red
const tripleAsteriskRedCode = \`
// *** this is coloured red ( by default ) 
// this is not
\`
<EditableRSH initialCode={tripleAsteriskRedCode} rows={4} columns={100} renderSH={
  (code) => <SyntaxHighlighterXXXComments>
    <Prism wrapLines={false} language='tsx' style={atomDark}>
      {code}
  </Prism>
  </SyntaxHighlighterXXXComments>
}/>
`

const example2 = `
const tripleAsteriskPropCode = \`
// *** this is coloured orange by using the color prop
// this is not
\`
<EditableRSH initialCode={tripleAsteriskPropCode} rows={4} columns={100} renderSH={
  (code) => <SyntaxHighlighterXXXComments color='orange' /* prop #orange*/>
    <Prism wrapLines={false} language='tsx' style={atomDark}>
      {code}
  </Prism>
  </SyntaxHighlighterXXXComments>
}/>
`


export function DemoXXXComments(){
  return <>
    <div>SyntaxHighlighterXXXComments component, default red</div>
    <SyntaxHighlighterComments>
      <Prism wrapLines={false} language='tsx' style={duotoneLight}>
          {example1}
      </Prism>
    </SyntaxHighlighterComments>
    <EditableRSH initialCode={tripleAsteriskRedCode} rows={4} columns={100} renderSH={
      (code) => <SyntaxHighlighterXXXComments>
        <Prism wrapLines={false} language='tsx' style={
        atomDark        
      }>
        {code}
      </Prism>
      </SyntaxHighlighterXXXComments>
    }/>

    <div>SyntaxHighlighterXXXComments component, color prop orange</div>
    <SyntaxHighlighterComments>
      <Prism wrapLines={false} language='tsx' style={duotoneLight}>
          {example2}
      </Prism>
    </SyntaxHighlighterComments>
    <EditableRSH initialCode={tripleAsteriskPropCode} rows={4} columns={100} renderSH={
      (code) => <SyntaxHighlighterXXXComments color='orange'>
        <Prism wrapLines={false} language='tsx' style={
        atomDark        
      }>
        {code}
      </Prism>
      </SyntaxHighlighterXXXComments>
    }/>
    </>
  }