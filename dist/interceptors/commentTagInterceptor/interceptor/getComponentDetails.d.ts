import { ComponentProvider, ComponentProvided } from "./types";
export declare enum ComponentType {
    Html = 0,
    ReactFragment = 1,
    Component = 2
}
export declare function isHtmlElementTagName(tagName: string): boolean;
export declare type ComponentProvidedOrString = ComponentProvided | string;
export declare function getComponentDetails(tagName: string, componentProvider: ComponentProvider): {
    componentTypeDetails: ComponentProvidedOrString;
    type: ComponentType;
};
