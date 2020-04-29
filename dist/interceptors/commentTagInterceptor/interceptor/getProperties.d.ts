/// <reference types="react" />
import { ElementNode, NodeRenderDetails } from "react-syntax-highlighter-renderer-interceptor";
import { ComponentType } from "./getComponentDetails";
import { PropsPrecedence, AdditionalProps, RespectStyleProp } from "./types";
export declare type CommentTagProps = RespectStyleProp & {
    commentStyleProp?: React.CSSProperties;
    commentDisplay?: boolean;
};
export declare function getStringAttributeValue(node: ElementNode): {
    valid: boolean;
    value: string;
};
export declare function getProperties(node: ElementNode, componentType: ComponentType, nodeRenderDetails: NodeRenderDetails, globalRespectStyleProp: boolean, additionalComponentProps: AdditionalProps, propsPrecedence: PropsPrecedence, mergeObjectProps: boolean, styleProps: string[]): ElementNode['properties'] | undefined;
