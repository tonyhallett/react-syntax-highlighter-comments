export interface RespectStyleProp{
  respectStyleProp?:boolean
}
export type AdditionalProps = RespectStyleProp & Record<string,any>
export enum PropsPrecedence { Instance, AdditionalProps}
export interface ComponentTypeWithProps {
  type:React.ComponentType,
  additionalProps:AdditionalProps,
  propsPrecedence?:PropsPrecedence,
  mergeObjectProps?:boolean
}
export type ComponentTypeOrWithProps = React.ComponentType|ComponentTypeWithProps
export type ComponentProvided = ComponentTypeOrWithProps|undefined;

export interface ComponentProvider{
  (tagName:string): ComponentProvided
}

