import {colorNamesObject} from '../src/helpers/colorNames'
import * as fs from 'fs';
import * as path from 'path';

interface ValueName<T extends 'textDecorationColor'|'textDecorationLine'|'textDecorationStyle'= any>{value:React.CSSProperties[T],componentName:string}
interface TextDecorationGeneration<T extends 'textDecorationColor'|'textDecorationLine'|'textDecorationStyle'= any>{
  prop:T
  valueNames:Array<{value:React.CSSProperties[T],componentName:string}|undefined>
}
function getColorGeneration():TextDecorationGeneration<'textDecorationColor'>{
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
const styleGeneration:TextDecorationGeneration<'textDecorationStyle'> = {
  prop:'textDecorationStyle',
  valueNames:[
    {value:'double',componentName:'Double'},
    {value:'dotted', componentName:'Dotted'},
    {value:'dashed', componentName:'Dashed'},
    {value:'wavy', componentName:'Wavy'},
    undefined//not specifying the default solid
  ]
}
const lineGeneration:TextDecorationGeneration<'textDecorationLine'>={
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

const textDecorationStylesFileName = 'textDecorationStyles.ts'
function findCommentComponentsDirectory():string{
  //would be better to search but will do for now
  return path.join(__dirname,'../src','interceptors','commentTagInterceptor', 'comment-components');
}
function generate(textDecorationsStyles:string){
  const outputPath = path.join(findCommentComponentsDirectory(),textDecorationStylesFileName);
  fs.writeFileSync(outputPath,textDecorationsStyles);
}
function generateTextDecorationStyles(
  first:TextDecorationGeneration,
  second:TextDecorationGeneration, 
  third:TextDecorationGeneration){
    
    function addProperty(component:string,property:string,value:string|undefined){
      if(value!==undefined){
       //component+=`${property}:'${value}' as React.CSSProperties['${property}'],`;
       component+=`${property}:'${value}',`;
      }
      return component
    }
    function getComponentNameAndValue(valueName:ValueName|undefined){
      const componentName = valueName?valueName.componentName:'';
      const value = valueName?valueName.value:undefined;
      return {
        value, componentName
      }
    }

    let textDecorationsStyles = 'export const textDecorationStyles = {';
    first.valueNames.forEach(firstValueName => {
      const {componentName:firstComponentName, value:firstPropValue} = getComponentNameAndValue(firstValueName);
      second.valueNames.forEach(secondValueName => {
        const {componentName:secondComponentName, value:secondPropValue} = getComponentNameAndValue(secondValueName);
        third.valueNames.forEach(thirdValueName => {
          const {componentName:thirdComponentName, value:thirdPropValue} = getComponentNameAndValue(thirdValueName);
          let component = `'${firstComponentName}${secondComponentName}${thirdComponentName}':{`;
          component = addProperty(component,third.prop,thirdPropValue);
          component = addProperty(component,second.prop,secondPropValue);
          component = addProperty(component,first.prop,firstPropValue);
          component+='},'
          textDecorationsStyles+=component;
        })
      });
    })
    textDecorationsStyles+='}';
    generate(textDecorationsStyles);
}

generateTextDecorationStyles(lineGeneration,styleGeneration,getColorGeneration());