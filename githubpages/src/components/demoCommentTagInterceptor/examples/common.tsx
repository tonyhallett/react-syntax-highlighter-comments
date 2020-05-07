import * as React from "react";
import { EditableRSH } from "react-syntax-highlighter-editable"
import { atomDark as prismStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import { SyntaxHighlighterComments, ComponentProvider } from "../../../../../src";
import { Prism } from "react-syntax-highlighter";

export const ExampleCode:React.FC<{additionalStyle?:Record<string,React.CSSProperties>, commentTagProvider:ComponentProvider,respectStyleProp?:boolean,rows?:number,columns?:number}>=({children,additionalStyle,commentTagProvider,respectStyleProp,rows=2,columns=100}) => {

  return <EditableRSH 
    initialCode={children as string} 
    rows={rows} 
    columns={columns} 
    renderSH={
      (code) => {
        
        return <SyntaxHighlighterComments 
          colourComments={false}
          commentClasses={false}
          commentLinks={false}
          commentRemoval={false}
          dollarCommentSplit={false}
          inlineStyles={false}
          nodeObjectPropertyAttacher={false}
          splitCommentChars={false}
          tripleAsterisk={false}
          referenceStyles={false}
          mergeStyles={false}
          commentTagProvider={commentTagProvider}
          respectStyleProp={respectStyleProp}
        >
          <Prism 
            language='tsx' 
            style={
              {
                ...prismStyle,
                ...additionalStyle
              }
          }>
            {code}
          </Prism>
      </SyntaxHighlighterComments>
      }
    }/>
}


