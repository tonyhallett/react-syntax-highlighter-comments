import { NodeRenderInterceptor} from "react-syntax-highlighter-renderer-interceptor";
import { isCommentNode, getCommentTextNode } from "../../common";
import { isFirstNode } from "../../helpers/isFirstNode";

function replaceNewLine(value:string):string{
  return value.replace('\n','');
}
// currently not necessary to have separate logic for prism vs highlight.
interface CommentKeyDetails{key:string,isPrism:boolean}
function shouldReplace(commentKey:CommentKeyDetails|undefined,nextKey:string):boolean{
  let shouldReplace=false;
  if(commentKey!==undefined){
    const commentKeyParts=commentKey.key.split('-');
    const nextKeyParts = nextKey.split('-');
    if(commentKeyParts.length===nextKeyParts.length){
      for(let i=0;i<commentKeyParts.length;i++){
        const commentKeyPart = commentKeyParts[i];
        const nextKeyPart = nextKeyParts[i];
        if(i===commentKeyParts.length-1){
          shouldReplace = Number.parseInt(commentKeyPart)===Number.parseInt(nextKeyPart)-1;
        }else{
          shouldReplace = commentKeyPart === nextKeyPart;
        }
      }
    }else{
      shouldReplace = false;
    }
  }
  return shouldReplace;  
}
export function createCommentRemover(regex:RegExp){
    let commentKey:CommentKeyDetails|undefined
    const commentRemover:NodeRenderInterceptor = (nodeDetails) => {
      if(isFirstNode(nodeDetails)){
        commentKey=undefined;
      }
      const node = nodeDetails.node;
      if(node.type === 'text'){
        /* 
          this works fine if the comment is at the beginning of the line 
          but if it is not whitespace from previous node to the comment will appear.

          Only solution is to change the react-syntax-highlighter-render-interceptor

          export function createCustomRenderer(
            styleCreator: StyleCreator = (style): React.CSSProperties => style,
            interceptor: NodeRenderInterceptor = (d): NodeRenderDetails => d
          ): CustomRenderer {
            return (details: CustomRendererDetails): React.ReactNode[] => {
              
              // instead of map, iterate and pass the full array through
              // but only for the root level ?
              // check the entry on each iteration to check if has been removed
              
              return details.rows.map((node, i) => {
                const key = `code-segment-${i}`;
                return createElement(
                  interceptor,
                  styleCreator,
                  {
                    node,
                    stylesheet: details.stylesheet,
                    useInlineStyles: details.useInlineStyles,
                    key,
                  },
                  key
                );
              });
            };
          }
        */
        /* if(shouldReplace(commentKey, nodeDetails.key)){
          node.value = replaceNewLine(node.value);
          return nodeDetails;
        }
        commentKey = undefined; */
      } else{
        if(isCommentNode(node)){
          const commentTextNode = getCommentTextNode(node);
          if(regex.exec(commentTextNode.value)){
            commentKey = {key: nodeDetails.key,isPrism:node.properties.className.indexOf('comment')!==-1};
            return undefined;
          }
        }
      }
      return nodeDetails;
    }
    return commentRemover;
}
