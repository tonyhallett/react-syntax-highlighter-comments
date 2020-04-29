import { getCommentTextNode } from "../common";
import { createCommentNodeRenderInterceptor } from "../helpers/commentHofs";

const commentClassRegex = /\{class=(.+)\}/;
export const commentClassProvider = createCommentNodeRenderInterceptor(nodeRenderDetails => {
  const commentTextNode = getCommentTextNode(nodeRenderDetails.node)
  const comment = commentTextNode.value;
  const match = commentClassRegex.exec(commentTextNode.value);
  
  if(match){
    const currentClassNames = nodeRenderDetails.node.properties.className;
    const className = match[1];
    const classes = className.split(' ');
    commentTextNode.value = comment.replace(commentClassRegex,'');
    classes.forEach(c => currentClassNames.push(c));
  }
  
  return nodeRenderDetails;
})