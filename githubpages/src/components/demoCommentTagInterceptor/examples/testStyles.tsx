import React from "react"
import { ExampleCode } from "./common";
import { builtInComponentFinder } from "../../../../../src";
import Typography from '@material-ui/core/Typography';
export const TestStyles:React.FC = ()=> {
const code =`
<Red>Red</Red>
<Red><Span style={{background:'white'}}>Span</Span></Red>
<Red><span>span</span></Red>
<Italic>Italic</Italic>

<XXXLarge><Bold>large</Bold></XXXLarge>
<Bold><XXXLarge>bold</XXXLarge></Bold>
`
  return <>
    <Typography>Nothing to explain here.</Typography>
    <ExampleCode 
      additionalStyle={
        {
          comment:{
            //fontSize:'small'
          }
      }
    } commentTagProvider={(tagName)=> {
      const found = builtInComponentFinder(tagName);
      if(tagName==='Red'){
        return {
          type:found,
          additionalProps:{
            style:{
              color:'green'
            }
          }
        }
      }
      if(tagName==='Italic'){
        return {
          type:found,
          additionalProps:{
            style:{
              fontSize:'xxx-large'
            }
          }
        }
      }
      return found;
    }}>
      {code}
    </ExampleCode>
  </>
}
//will then demo Red with additional style prop does not work