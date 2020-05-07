import * as fs from 'fs';
import * as path from 'path';
import {lineGeneration,styleGeneration,getColorGeneration,TextDecorationGeneration,ValueName} from '../src/interceptors/commentTagInterceptor/comment-components/textDecorationCommon'

function findCommentComponentsDirectory():string{
  //would be better to search but will do for now
  return path.join(__dirname,'../src','interceptors','commentTagInterceptor', 'comment-components');
}

function generateTextDecorationStylesType(
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
    // will need to import this DisplayReactFCObject<T>
    let textDecorationsStylesType = `
      export const textDecorationStylesType = {
    `;
    first.valueNames.forEach(firstValueName => {
      const {componentName:firstComponentName} = getComponentNameAndValue(firstValueName);
      second.valueNames.forEach(secondValueName => {
        const {componentName:secondComponentName} = getComponentNameAndValue(secondValueName);
        third.valueNames.forEach(thirdValueName => {
          const {componentName:thirdComponentName} = getComponentNameAndValue(thirdValueName);
          let component = `'${firstComponentName}${secondComponentName}${thirdComponentName}':{},`;
          textDecorationsStylesType+=component;
        })
      });
    })
    textDecorationsStylesType+='}';
    generateType(textDecorationsStylesType);
}
const textDecorationStylesTypeFileName = 'textDecorationStylesType.ts'
function generateType(type:string){
  const outputPath = path.join(findCommentComponentsDirectory(),textDecorationStylesTypeFileName);
  fs.writeFileSync(outputPath,type);
}

generateTextDecorationStylesType(lineGeneration,styleGeneration,getColorGeneration());
