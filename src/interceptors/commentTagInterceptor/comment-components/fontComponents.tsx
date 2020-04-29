import * as React from "react";
import { generateStylePropAwareComponentsInternal } from "../helpersInternal";
import {textDecorationStyles} from './textDecorationStyles'
import { CommentTagType } from "./common";

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
  ...textDecorationStyles
}
export const FontComponents = generateStylePropAwareComponentsInternal(fontStyles);

type Shortline = 'none'|'ul'|'ol'|'lt'|'ulol'|'ullt'|'ollt'|'all';

export interface TextDecorationOnlyProps{
  isSpan?:boolean,
  l?:Shortline
  s?:'double'|'dotted'|'dashed'|'wavy'
  th?:React.CSSProperties['textDecorationThickness']
  c:React.CSSProperties['color']
}
const lineThrough = 'line-through';
const overline = 'overline';
const underline = 'underline';
function getTextDecorationLine(shortline:Shortline){
  switch(shortline){
    case 'none':
      return 'none';
    case 'lt':
      return lineThrough;
    case 'ol':
      return overline;
    case 'ul':
      return underline;
    case 'ollt':
      return `${overline} ${lineThrough}`;
    case 'ullt':
      return `${underline} ${lineThrough}`
    case 'ulol':
      return `${underline} ${overline}`;
    case 'all':
      return `${underline} ${overline} ${lineThrough}`
  } 
}
export const TextDecoration:CommentTagType<TextDecorationOnlyProps> = ({commentDisplay: display, children,commentStyleProp: commentStyle,respectStyleProp,th,s,l='ul',isSpan=true,c}) => {
  if(display){
    const baseStyle:React.CSSProperties = respectStyleProp && commentStyle?commentStyle:{};
    const componentStyle = {
      textDecorationStyle:s,
      textDecorationLine: getTextDecorationLine(l),
      textDecorationColor:c,
      textDecorationThickness:th
    }
    const actualStyle = {...baseStyle,...componentStyle}
    if(isSpan){
      return <span style={actualStyle}>{children?children:''}</span>
    }
    return <div style={actualStyle}>{children?children:''}</div>
    
  }
  return null;
}
TextDecoration.displayName = 'TextDecoration';