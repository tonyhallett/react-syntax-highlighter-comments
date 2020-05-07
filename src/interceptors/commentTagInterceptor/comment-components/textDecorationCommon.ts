import { colorNamesObject } from "../../../helpers/colorNames";

export interface ValueName<T extends 'textDecorationColor'|'textDecorationLine'|'textDecorationStyle'= any>{value:React.CSSProperties[T],componentName:string}
export interface TextDecorationGeneration<T extends 'textDecorationColor'|'textDecorationLine'|'textDecorationStyle'= any>{
  prop:T
  valueNames:Array<{value:React.CSSProperties[T],componentName:string}|undefined>
}
export function getColorGeneration():TextDecorationGeneration<'textDecorationColor'>{
  const valueNames:Array<ValueName|undefined> = Object.keys(colorNamesObject).map(cn=>{
    return {
      componentName:cn,
      value:cn.toLowerCase()
    }
  });
  valueNames.push(undefined);
  return {
    prop:'textDecorationColor',
    valueNames
  }
}
export const styleGeneration:TextDecorationGeneration<'textDecorationStyle'> = {
  prop:'textDecorationStyle',
  valueNames:[
    {value:'double',componentName:'Double'},
    {value:'dotted', componentName:'Dotted'},
    {value:'dashed', componentName:'Dashed'},
    {value:'wavy', componentName:'Wavy'},
    undefined//not specifying the default solid
  ]
}
export const lineGeneration:TextDecorationGeneration<'textDecorationLine'>={
  prop:'textDecorationLine',
  valueNames:[
    {value:'underline', componentName:'Ul'},
    {value:'overline', componentName:'Ol'},
    {value:'line-through', componentName:'Lt'},
    {value:'underline overline', componentName:'UlOl'},
    {value:'underline line-through', componentName:'UlLt'},
    {value:'overline line-through', componentName:'OlLt'},
    {value:'underline overline line-through', componentName:'UlOlLt'}
  ]
}