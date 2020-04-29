"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../../common");
var isFirstNode_1 = require("../../helpers/isFirstNode");
function replaceNewLine(value) {
    return value.replace('\n', '');
}
function shouldReplace(commentKey, nextKey) {
    var shouldReplace = false;
    if (commentKey !== undefined) {
        var commentKeyParts = commentKey.key.split('-');
        var nextKeyParts = nextKey.split('-');
        if (commentKeyParts.length === nextKeyParts.length) {
            for (var i = 0; i < commentKeyParts.length; i++) {
                var commentKeyPart = commentKeyParts[i];
                var nextKeyPart = nextKeyParts[i];
                if (i === commentKeyParts.length - 1) {
                    shouldReplace = Number.parseInt(commentKeyPart) === Number.parseInt(nextKeyPart) - 1;
                }
                else {
                    shouldReplace = commentKeyPart === nextKeyPart;
                }
            }
        }
        else {
            shouldReplace = false;
        }
    }
    return shouldReplace;
}
function createCommentRemover(regex) {
    var commentKey;
    var commentRemover = function (nodeDetails) {
        if (isFirstNode_1.isFirstNode(nodeDetails)) {
            commentKey = undefined;
        }
        var node = nodeDetails.node;
        if (node.type === 'text') {
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
        }
        else {
            if (common_1.isCommentNode(node)) {
                var commentTextNode = common_1.getCommentTextNode(node);
                if (regex.exec(commentTextNode.value)) {
                    commentKey = { key: nodeDetails.key, isPrism: node.properties.className.indexOf('comment') !== -1 };
                    return undefined;
                }
            }
        }
        return nodeDetails;
    };
    return commentRemover;
}
exports.createCommentRemover = createCommentRemover;
//# sourceMappingURL=commentRemover.js.map