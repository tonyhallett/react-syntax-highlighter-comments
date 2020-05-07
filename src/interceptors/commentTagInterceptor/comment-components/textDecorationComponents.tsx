import { CommentTagType } from "..";
import * as React from "react";
export { TextDecorationComponents} from './textDecorationGeneration'


export type Shortline = 'none'|'ul'|'ol'|'lt'|'ulol'|'ullt'|'ollt'|'all';

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
export const TextDecoration:CommentTagType<TextDecorationOnlyProps> = (
  {
    commentDisplay, 
    children,
    commentStyleProp,
    respectStyleProp,
    th,
    s,
    l='ul',
    isSpan=true,
    c}) => {
  if(commentDisplay){
    const baseStyle:React.CSSProperties = respectStyleProp && commentStyleProp?commentStyleProp:{};
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