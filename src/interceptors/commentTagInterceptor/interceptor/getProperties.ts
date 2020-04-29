import { ElementNode, NodeRenderDetails, TextNode } from "react-syntax-highlighter-renderer-interceptor";
import { StringToObjectParser, ProcessResult } from "string-object-to-object";
import { ComponentType } from "./getComponentDetails";
import { PropsPrecedence, AdditionalProps, RespectStyleProp } from "./types";

//needs to be moved out
export type CommentTagProps = RespectStyleProp & {commentStyleProp?:React.CSSProperties, commentDisplay?:boolean};

enum TagElementNodeType {AttributeName, StringValue, CurlyBraces, Unknown}
function getTagElementNodeType(elementNode:ElementNode){
  const className = elementNode.properties.className;
  if(className.indexOf('attr-name')!==-1){
    return TagElementNodeType.AttributeName;
  }else if(className.indexOf('attr-value')!==-1){
    return TagElementNodeType.StringValue;
  }else if(className.indexOf('language-javascript')!==-1){
    return TagElementNodeType.CurlyBraces;
  }
  return TagElementNodeType.Unknown;
}
interface ElementAttribute{name:string,elementNodeDetails:{node:ElementNode,type:TagElementNodeType}|undefined}
function getAttributes(rootNode:ElementNode):Array<ElementAttribute>|undefined{
  function getAttributeName(attributeNode:ElementNode){
    return (attributeNode.children[0] as TextNode).value;
  }
  const elementAttributes:ElementAttribute[]=[];
  let attributeNode:ElementNode|undefined;
  const children=rootNode.children;
  for(let i=1;i<children.length-1;i++){
    const node = children[i];
    if(node.type==='element'){
      const nodeType = getTagElementNodeType(node);
      if(nodeType===TagElementNodeType.Unknown){
        return undefined;
      }
      if(nodeType===TagElementNodeType.AttributeName){
        if(attributeNode){
          elementAttributes.push({name:getAttributeName(attributeNode),elementNodeDetails:undefined});
        }
        attributeNode = node;
      }else{
        if(attributeNode===undefined){
          return undefined;
        }
        elementAttributes.push({name:getAttributeName(attributeNode),elementNodeDetails:{node,type:nodeType}});
        attributeNode=undefined;
      }
    }
  }
  if(attributeNode){
    elementAttributes.push({name:getAttributeName(attributeNode),elementNodeDetails:undefined})
  }
  return elementAttributes;
}
export function getStringAttributeValue(node:ElementNode):{valid:boolean,value:string}{
  if(!(node.children.length===3||node.children.length===4)){
    return {valid:false,value:''}
  }
  if(node.children.length===3){
    return {valid:true,value:''}
  }
  return {valid:true,value:(node.children[2] as TextNode).value}
}

function getCurlyAttributeValueAsString(node:ElementNode){
  const children = node.children;
  let text = '';
  for(let i=2;i<children.length-1;i++){
    const node=children[i];
    if(node.type==='text'){
      text+=node.value;
    }else{
      text+=(node.children[0] as TextNode).value;
    }
  }
  return text.trim();
}
function getCurlyAttributeValue(node:ElementNode):{valid:boolean,value:any}{
  const asString = getCurlyAttributeValueAsString(node);
  if(asString==='false'){
    return {valid:true,value:false}
  }
  if(asString==='true'){
    return {valid:true,value:true}
  }
  if(asString==='null'){
    return {valid:true,value:null}
  }
  if(asString==='undefined'){
    return {valid:true,value:undefined}
  }
  if(asString.indexOf('[')===0){
    const parser = new StringToObjectParser();
    let processResult:ProcessResult=ProcessResult.Break;
    const fakeObject=`{arrayProp: ${asString}}`;
    for (var x = 1, c=''; c = fakeObject.charAt(x); x++) { 
      processResult = parser.process(c);
      if(processResult === ProcessResult.Break){
        return {valid:false,value:undefined}
      }
    }
    if(processResult===ProcessResult.Completed){
      return {valid:true,value:parser.getCompleted().arrayProp}
    }
    return {valid:false,value:undefined}
    
  }
  if(asString.indexOf('{')===0){
    const parser = new StringToObjectParser();
    let processResult:ProcessResult=ProcessResult.Break;
    for (var x = 1, c=''; c = asString.charAt(x); x++) { 
      processResult = parser.process(c);
      if(processResult === ProcessResult.Break){
        return {valid:false,value:undefined}
      }
    }
    if(processResult===ProcessResult.Completed){
      return {valid:true,value:parser.getCompleted()}
    }
    return {valid:false,value:undefined}
  }
  const parser = new StringToObjectParser();
  let processResult:ProcessResult=ProcessResult.Break;
  const fakeObject=`{numberProp: ${asString}}`;
  for (var x = 1, c=''; c = fakeObject.charAt(x); x++) { 
    processResult = parser.process(c);
    if(processResult === ProcessResult.Break){
      return {valid:false,value:undefined}
    }
  }
  return {valid:true,value:parser.getCompleted().numberProp}
}

function isObject(test:any){
  return test!==null&&!Array.isArray(test) && typeof test === 'object';
}
function mergeObjectPropsOperation(properties:Record<string,any>,additionalProps:Record<string,any>, propsPrecedence:PropsPrecedence):any{
  const first = propsPrecedence === PropsPrecedence.AdditionalProps? properties: additionalProps;
  const precedence = propsPrecedence === PropsPrecedence.AdditionalProps? additionalProps: properties;

  const newProperties = {} as any;
  Object.keys(first).forEach(prop => {
    const firstProp = first[prop];
    if(isObject(firstProp)){
      newProperties[prop] = {...firstProp};
    }else{
      newProperties[prop] = firstProp;
    }
  })
  Object.keys(precedence).forEach(prop => {
    let precedenceProp = precedence[prop];
    const precedencePropIsObject = isObject(precedenceProp);
    if(precedencePropIsObject){
      precedenceProp={...precedenceProp};
    }
    const firstProp = newProperties[prop];
    let setPrecedence = true;
    if(firstProp && isObject(firstProp) && precedencePropIsObject){
      newProperties[prop] = {...firstProp,...precedenceProp};
      setPrecedence = false;
    }
    if(setPrecedence){
      newProperties[prop] = precedenceProp;
    }
  });
  return newProperties;
}
export function getProperties(
  node: ElementNode, 
  componentType: ComponentType, 
  nodeRenderDetails: NodeRenderDetails, 
  globalRespectStyleProp:boolean,
  additionalComponentProps: AdditionalProps, 
  propsPrecedence: PropsPrecedence, 
  mergeObjectProps: boolean, 
  styleProps: string[]): ElementNode['properties'] | undefined {
  const attributes = getAttributes(node);
  if (attributes) {
    additionalComponentProps = {respectStyleProp:globalRespectStyleProp,...additionalComponentProps};
    const additionalProps = attributes.map(a => {
      let valueDetails: {
        valid: boolean;
        value: any;
      };
      if (a.elementNodeDetails === undefined) {
        valueDetails = { valid: true, value: true };
      }
      else {
        if (a.elementNodeDetails.type === TagElementNodeType.StringValue) {
          valueDetails = getStringAttributeValue(a.elementNodeDetails.node);
        }
        else {
          valueDetails = getCurlyAttributeValue(a.elementNodeDetails.node);
        }
      }
      return { name: a.name, valueDetails };
    });
    let properties: ElementNode['properties'] = { className: [] };
    for (let i = 0; i < additionalProps.length; i++) {
      const additionalProp = additionalProps[i];
      if (!additionalProp.valueDetails.valid) {
        return undefined;
      }
      properties[additionalProp.name] = additionalProp.valueDetails.value;
    }
    if (componentType === ComponentType.Component) {
      properties.commentDisplay = true;
      if (mergeObjectProps) {
        properties = mergeObjectPropsOperation(properties, additionalComponentProps, propsPrecedence);
      }
      else {
        if (propsPrecedence === PropsPrecedence.AdditionalProps) {
          properties = { ...properties, ...additionalComponentProps };
        }
        else {
          properties = { ...additionalComponentProps, ...properties };
        }
      }
    }
    if (nodeRenderDetails.useInlineStyles && componentType === ComponentType.Component) {
      const stylesheet = nodeRenderDetails.stylesheet;
      styleProps.push('comment');
      styleProps.forEach(styleProp => {
        const stylesheetStyle = stylesheet[styleProp];
        if (stylesheetStyle) {
          properties[`${styleProp}StyleProp`] = { ...stylesheetStyle };
        }
      });
    }
    return properties;
  }
}
