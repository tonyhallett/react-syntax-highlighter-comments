"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../../common");
var commentHofs_1 = require("../../helpers/commentHofs");
var createLinksAndComments_1 = require("./createLinksAndComments");
function createCommentLinkInterceptor(commentLinkMatcher) {
    var commentLinkInterceptor = commentHofs_1.createCommentNodeRenderInterceptor(function (nodeDetails) {
        var node = nodeDetails.node;
        var commentLinkMatch = commentLinkMatcher(common_1.getCommentTextNode(node).value);
        if (commentLinkMatch) {
            nodeDetails.node = {
                properties: {
                    className: nodeDetails.node.properties.className.filter(function (cn) { return !(cn === 'comment' || cn === 'hljs-comment'); }),
                },
                type: 'element',
                tagName: 'span',
                children: createLinksAndComments_1.createLinksAndComments(commentLinkMatch)
            };
        }
        return nodeDetails;
    });
    return commentLinkInterceptor;
}
exports.createCommentLinkInterceptor = createCommentLinkInterceptor;
//# sourceMappingURL=commentLinkInterceptorCreator.js.map