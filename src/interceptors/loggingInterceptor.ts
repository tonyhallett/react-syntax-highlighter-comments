import { NodeRenderInterceptor, NodeRenderDetails, RenderNode, ElementNode } from "react-syntax-highlighter-renderer-interceptor";
//have sufficient to test - commentComponentInterceptor

function getProperties(properties:ElementNode['properties']){
return `
{
  className:[${properties.className.map(cn=>`'${cn}'`).join(',')}]
}`
}
function getChildren(children:Array<RenderNode>):string{
  return `
  [${children.map(c=>getNode(c)).join(',')}]
  `
}
function getElementNode(node:ElementNode){
  return `
{
  type:'${node.type}',
  tagName:'${node.tagName}',
  properties:${getProperties(node.properties)},
  children:${getChildren(node.children)}
}
  `
}
function getNode(node:RenderNode){
  
  if(node.type==='text'){
    return `
{
  type:'text',
  value:"${node.value}"
}`;
  }else{
    return getElementNode(node);
  }
}
function logNodeRenderDetails(nodeRenderDetails:NodeRenderDetails){
 console.log(`
{
  node:${getNode(nodeRenderDetails.node)}
}`);
}
export const loggingInterceptor:NodeRenderInterceptor=(nodeRenderDetails => {
  const node = nodeRenderDetails.node;
  if(node.type === 'element'){
    if(node.properties.className.some(c=>c==='tag')){
      //logNodeRenderDetails(nodeRenderDetails)
    }
  }
  return nodeRenderDetails;
})