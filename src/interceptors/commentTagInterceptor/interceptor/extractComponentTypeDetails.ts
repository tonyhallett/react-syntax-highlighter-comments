import { AdditionalProps, PropsPrecedence, ComponentTypeWithProps } from "./types";
import { ComponentProvidedOrString } from "./getComponentDetails";

export type TagComponentType = React.ComponentType | string

export function isComponentTypeWithProps(componentTypeDetails:ComponentProvidedOrString):componentTypeDetails is ComponentTypeWithProps{
  return (componentTypeDetails as ComponentTypeWithProps).additionalProps!==undefined
}
export function extractComponentTypeDetails(componentTypeDetails: ComponentProvidedOrString) {
  let componentType: TagComponentType;
  let additionalProps: AdditionalProps = {};
  let propsPrecedence = PropsPrecedence.Instance;
  let mergeObjectProps = true;
  if (isComponentTypeWithProps(componentTypeDetails)) {
    componentType = componentTypeDetails.type;
    additionalProps = componentTypeDetails.additionalProps;
    if (componentTypeDetails.propsPrecedence !== undefined) {
      propsPrecedence = componentTypeDetails.propsPrecedence;
    }
    if (componentTypeDetails.mergeObjectProps !== undefined) {
      mergeObjectProps = componentTypeDetails.mergeObjectProps;
    }
  }
  else {
    componentType = componentTypeDetails as any;
  }
  return {
    componentType,
    additionalProps,
    propsPrecedence,
    mergeObjectProps
  };
}
