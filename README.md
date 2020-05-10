All interceptors and stylers work well with a TextArea for demonstration purposes.

From the component readme !

![alt text](../README-assets/images/SyntaxHighlighterComments.png "SyntaxHighlighterComments")

```tsx
import * as React from 'react';
import { SyntaxHighlighterComments} from '../../../dist'
import { Prism } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const code = `
// normal comment without react-syntax-highlighter-comments
// triple asterisk turns red ***
`
const syntaxHighlighterComments:React.FC = () => <SyntaxHighlighterComments 
/* commentMatchReplaceStyler={(comment)=>{
  const replaced = comment.replace('upsidedown','');
  if(replaced!==comment){
    return {
      newComment:replaced,
      matchStyle:{transform:'rotate(180deg)',display:'inline-block'}
    }
  }
}} */

//typeInterceptorDetails={[{name:'Demo',component:DemoTypeComponent}]} 
//respectStyleProp={respectStyleProp}
/* commentTagProvider={
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
} */><Prism language='tsx'style={
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
  },
  //...stylePropComment
}
}>
  {code}
</Prism>
</SyntaxHighlighterComments>  
export default syntaxHighlighterComments;```