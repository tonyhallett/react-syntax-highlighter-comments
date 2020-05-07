import React from "react"
import { ExampleCode } from "./common";
import { FontComponents as F, HtmlComponents as H, createComponentProvider } from "../../../../../src";
import { Em33Typography } from "../../common";

export const DemoFontComponents:React.FC = ()=> {
  const fontWeightStyleCode = `
  <Italic>Style</Italic>

  <Lighter>Style</Lighter>
  <Bold>Style</Bold>
  <Bolder>Style</Bolder>
  `
  const sizeCode = `
  <XXSmall>Size</XXSmall>
  <XSmall>Size</XSmall>
  <Small>Size</Small>
  <Medium>Size</Medium>
  <Large>Size</Large>
  <XLarge>Size</XLarge>
  <XXLarge>Size</XXLarge>
  <XXXLarge>Size</XXXLarge>

  // Size for comparison
     <Span>Size</Span>
     <Smaller>Size</Smaller>
     <Larger>Size</Larger>
  `
  const textDecorationCode = `
  <Ul>Solid Underline</Ul>

  <UlOl>Underline and overline</UlOl>

  <UlOlLt>All lines</UlOlLt>

  <UlDouble>Double</UlDouble>

  <UlDotted>Dotted</UlDotted>

  <UlDashed>Dashed</UlDashed>

  <UlWavy>Wavy</UlWavy>

  <OlWavyLimegreen>Lime green></OlWavyLimegreen>

  <OlWavyIndianred>Indian red</OlWavyIndianred>

  `
  const fontFamily ='Muli';
  return <>
    <Em33Typography>To do - how to import the tag if using in code exported to comments</Em33Typography>
    <Em33Typography>{`The react-syntax-highlighter has style prop with comment key with fontFamily ${fontFamily} to demonstrate Lighter and Bold.  Bolder does not work`}</Em33Typography>
    <ExampleCode additionalStyle={
      {
        comment:{
          fontFamily
        }
      }
    } commentTagProvider={createComponentProvider([
      F.Italic, F.Lighter, F.Bolder,
      F.Bold
    ])}>
      {fontWeightStyleCode
      }
    </ExampleCode>
    <Em33Typography>Just tags</Em33Typography>
    <ExampleCode commentTagProvider={createComponentProvider([
      F.XXSmall, F.XSmall, F.Small,
      F.Medium, F.Large, F.XLarge,
      F.XXLarge, F.XXXLarge, 
      F.Smaller, F.Larger,H.span
    ])}>
      {sizeCode
      }
    </ExampleCode>
    <Em33Typography>To do - describe the permutations</Em33Typography>
    <ExampleCode commentTagProvider={createComponentProvider([
      F.Ul,F.UlOl,F.UlOlLt, F.UlDouble, F.UlDotted, F.UlDashed, F.UlWavy, F.OlWavyLimegreen, F.OlWavyIndianred
    ])}>
      {textDecorationCode
      }
    </ExampleCode>
  </>
}

