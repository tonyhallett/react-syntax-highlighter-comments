import * as React from "react";
import { ComponentProvider, ComponentProvided } from "./types";
export enum ComponentType {Html, ReactFragment,Component}
export function isHtmlElementTagName(tagName:string):boolean{
  return tagName[0]!==tagName[0].toUpperCase();
}
export type ComponentProvidedOrString = ComponentProvided | string
export function getComponentDetails(tagName: string, componentProvider: ComponentProvider): {
  componentTypeDetails: ComponentProvidedOrString;
  type: ComponentType;
} {
  let componentTypeDetails: ComponentProvided | string;
  let type = ComponentType.Html;
  const isHtmlElement = isHtmlElementTagName(tagName);
  if (isHtmlElement) {
    componentTypeDetails = tagName;
  }
  else {
    if (tagName === 'Fragment' || tagName === 'React.Fragment') {
      componentTypeDetails = React.Fragment;
      type = ComponentType.ReactFragment;
    }
    else {
      componentTypeDetails = componentProvider(tagName);
      type = ComponentType.Component;
    }
  }
  return { componentTypeDetails, type };
}
