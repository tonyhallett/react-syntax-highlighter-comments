"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../common");
var commentHofs_1 = require("../helpers/commentHofs");
var commentClassRegex = /\{class=(.+)\}/;
exports.commentClassProvider = commentHofs_1.createCommentNodeRenderInterceptor(function (nodeRenderDetails) {
    var commentTextNode = common_1.getCommentTextNode(nodeRenderDetails.node);
    var comment = commentTextNode.value;
    var match = commentClassRegex.exec(commentTextNode.value);
    if (match) {
        var currentClassNames_1 = nodeRenderDetails.node.properties.className;
        var className = match[1];
        var classes = className.split(' ');
        commentTextNode.value = comment.replace(commentClassRegex, '');
        classes.forEach(function (c) { return currentClassNames_1.push(c); });
    }
    return nodeRenderDetails;
});
//# sourceMappingURL=commentClassProvider.js.map