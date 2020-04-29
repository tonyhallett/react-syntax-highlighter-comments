/// <reference types="react" />
import { AdditionalProps, PropsPrecedence, ComponentTypeWithProps } from "./types";
import { ComponentProvidedOrString } from "./getComponentDetails";
export declare type TagComponentType = React.ComponentType | string;
export declare function isComponentTypeWithProps(componentTypeDetails: ComponentProvidedOrString): componentTypeDetails is ComponentTypeWithProps;
export declare function extractComponentTypeDetails(componentTypeDetails: ComponentProvidedOrString): {
    componentType: string | import("react").ComponentClass<{}, any> | import("react").FunctionComponent<{}>;
    additionalProps: AdditionalProps;
    propsPrecedence: PropsPrecedence;
    mergeObjectProps: boolean;
};
