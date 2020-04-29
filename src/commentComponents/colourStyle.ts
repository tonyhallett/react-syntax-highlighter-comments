import { colorNames } from "../helpers/colorNames";

interface CreateColorStyleOptions{
  keyPrefix:string,
  colorProperty:string
}
export function createColorStyle(...options:CreateColorStyleOptions[]){
  const colorStyle = {} as Record<string,React.CSSProperties>
  colorNames.forEach(cn => {
    const colorName = cn[0].toLowerCase();
    options.forEach(option => {
      colorStyle[option.keyPrefix + colorName] = {
        [option.colorProperty]:cn[1]
      }
    })
  });
  return colorStyle;
}
export const colorStyle=createColorStyle(
  {keyPrefix:'color-',colorProperty:'color'},
  {keyPrefix:'bgcolor-',colorProperty:'backgroundColor'}
);