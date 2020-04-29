/// <reference types="react" />
export interface RespectStyleProp {
    respectStyleProp?: boolean;
}
export declare type AdditionalProps = RespectStyleProp & Record<string, any>;
export declare enum PropsPrecedence {
    Instance = 0,
    AdditionalProps = 1
}
export interface ComponentTypeWithProps {
    type: React.ComponentType;
    additionalProps: AdditionalProps;
    propsPrecedence?: PropsPrecedence;
    mergeObjectProps?: boolean;
}
export declare type ComponentTypeOrWithProps = React.ComponentType | ComponentTypeWithProps;
export declare type ComponentProvided = ComponentTypeOrWithProps | undefined;
export interface ComponentProvider {
    (tagName: string): ComponentProvided;
}
