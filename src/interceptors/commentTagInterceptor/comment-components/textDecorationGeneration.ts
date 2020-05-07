import { textDecorationStylesType } from "./textDecorationStylesType";
import { generateStylePropAwareComponentsInternal } from "../helpersInternal";
import { DisplayReactFCObject } from "../DisplayReactFCObject";
import { TextDecorationGeneration, ValueName, lineGeneration, styleGeneration, getColorGeneration } from "./textDecorationCommon";



function generateTextDecorationComponents(
  first:TextDecorationGeneration,
  second:TextDecorationGeneration, 
  third:TextDecorationGeneration):DisplayReactFCObject<typeof textDecorationStylesType>{
    
    const textDecorationStyles = {} as any;
    function getComponentNameAndValue(valueName:ValueName|undefined){
      const componentName = valueName?valueName.componentName:'';
      const value = valueName?valueName.value:undefined;
      return {
        value, componentName
      }
    }

    first.valueNames.forEach(firstValueName => {
      const {componentName:firstComponentName, value:firstPropValue} = getComponentNameAndValue(firstValueName);
      second.valueNames.forEach(secondValueName => {
        const {componentName:secondComponentName, value:secondPropValue} = getComponentNameAndValue(secondValueName);
        third.valueNames.forEach(thirdValueName => {
          const {componentName:thirdComponentName, value:thirdPropValue} = getComponentNameAndValue(thirdValueName);

          let componentStyles={} as any;
          textDecorationStyles[`${firstComponentName}${secondComponentName}${thirdComponentName}`]  = componentStyles;
          componentStyles[third.prop] = thirdPropValue;
          componentStyles[second.prop] = secondPropValue;
          componentStyles[first.prop] = firstPropValue;
        })
      });
    })
    return generateStylePropAwareComponentsInternal(textDecorationStyles);
}

export const TextDecorationComponents = generateTextDecorationComponents(lineGeneration,styleGeneration,getColorGeneration());