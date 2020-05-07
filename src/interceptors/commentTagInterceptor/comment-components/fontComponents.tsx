import * as React from "react";
import { generateStylePropAwareComponentsInternal } from "../helpersInternal";
import { TextDecorationComponents } from "./textDecorationComponents";
export { TextDecoration } from "./textDecorationComponents"

const fontStyles = {
  'Italic':{
    fontStyle:'italic' as React.CSSProperties['fontStyle']
  },
  'Oblique':{
    fontStyle:'oblique' as React.CSSProperties['fontStyle']
  },
  'Lighter':{
    fontWeight:'lighter' as React.CSSProperties['fontWeight']
  },
  'Bold':{
    fontWeight:'bold' as React.CSSProperties['fontWeight']
  },
  'Bolder':{
    fontWeight:'bolder' as React.CSSProperties['fontWeight']
  },
  //could fw100 etc
  'XXSmall':{
    fontSize:'xx-small' as React.CSSProperties['fontSize']
  },
  'XSmall':{
    fontSize:'x-small' as React.CSSProperties['fontSize']
  },
  'Small':{
    fontSize:'small' as React.CSSProperties['fontSize']
  },
  'Medium':{
    fontSize:'medium' as React.CSSProperties['fontSize']
  },
  'Large':{
    fontSize:'large' as React.CSSProperties['fontSize']
  },
  'XLarge':{
    fontSize:'x-large' as React.CSSProperties['fontSize']
  },
  'XXLarge':{
    fontSize:'xx-large' as React.CSSProperties['fontSize']
  },
  'XXXLarge':{
    fontSize:'xxx-large' as React.CSSProperties['fontSize']
  },
  'Smaller':{
    fontSize:'smaller' as React.CSSProperties['fontSize']
  },
  'Larger':{
    fontSize:'larger' as React.CSSProperties['fontSize']
  },
}

export const FontComponents = {...generateStylePropAwareComponentsInternal(fontStyles),...TextDecorationComponents};

