import { NodeRenderInterceptor, ElementNode } from "react-syntax-highlighter-renderer-interceptor"
import { isFirstNode } from "../../../helpers/isFirstNode";
import { TagStack } from "./TagStack";
import { nodeIsTag } from "./nodeHelpers";
import { getTagDetails, TagType } from "./getTagDetails";
import { getComponentDetails, ComponentType } from "./getComponentDetails";
import { getProperties } from "./getProperties";
import { ComponentProvider } from "./types";
import { extractComponentTypeDetails, TagComponentType } from "./extractComponentTypeDetails";


function getStyleProps(type:ComponentType,componentType:TagComponentType){
  let styleProps = type === ComponentType.Component ? (componentType as any).styleProps || [] :[];
  if(typeof styleProps === 'string'){
    styleProps = [styleProps];
  }
  return styleProps;
}
export const createCommentTagInterceptor = (componentProvider:ComponentProvider, globalRespectStyleProp=true) => {
  let tagStack:TagStack;
  const commentTagInterceptor:NodeRenderInterceptor = (nodeRenderDetails => {
    if(isFirstNode(nodeRenderDetails)){
      tagStack=new TagStack();
    }
    // possible that may throw during text area code typing
    try{
      const node = nodeRenderDetails.node;
      if(tagStack.nodeProcessed(node)){
        return nodeRenderDetails;
      }else{
        if(nodeIsTag(node)){
          const tagDetails = getTagDetails(node as ElementNode);
          if(tagDetails){
            const { tagName, tagType } = tagDetails;
            if(tagType === TagType.Start||tagType === TagType.SelfClosing){
              const {componentTypeDetails, type} = getComponentDetails(tagName, componentProvider);
              if(componentTypeDetails!==undefined){
                const {additionalProps, mergeObjectProps, propsPrecedence, componentType} = extractComponentTypeDetails(componentTypeDetails);
                const styleProps = getStyleProps(type,componentType);
                
                const properties = getProperties(node as ElementNode,type, nodeRenderDetails,globalRespectStyleProp,additionalProps,propsPrecedence,mergeObjectProps,styleProps);
                
                if(properties){
                  if(tagType ===TagType.Start){
                    return tagStack.processStart(nodeRenderDetails, componentType,tagName, properties);
                  }
                  return tagStack.processSelfClosing(nodeRenderDetails, componentType, properties);
                }
              }
            }else{
              return tagStack.processEnd(nodeRenderDetails,tagName)
            }
          }
          return tagStack.bail(nodeRenderDetails);
        }
        return tagStack.processNonTagNode(nodeRenderDetails)
      }
      
    }catch(e){
      /* istanbul ignore if*/
      if(process && process.env && process.env.NODE_ENV !=='test'){
        console.log('comment tag interceptor error.');
        console.log(e.message);
      }
      
      return tagStack.bail(nodeRenderDetails);
    }
  });
  return commentTagInterceptor;
}

