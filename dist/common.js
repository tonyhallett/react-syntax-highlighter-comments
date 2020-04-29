"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isCommentNode(renderNode) {
    var isCommentNode = false;
    if (renderNode.type === 'element') {
        var classNames = renderNode.properties.className || [];
        for (var i = 0; i < classNames.length; i++) {
            var className = classNames[i];
            if (className === 'comment' || className === 'hljs-comment') {
                isCommentNode = true;
                break;
            }
        }
    }
    return isCommentNode;
}
exports.isCommentNode = isCommentNode;
function getCommentTextNode(node) {
    if (!isCommentNode(node)) {
        throw new Error('not an element node');
    }
    else {
        return node.children[0];
    }
}
exports.getCommentTextNode = getCommentTextNode;
function createCommentNode(comment) {
    return {
        type: 'element',
        tagName: 'span',
        properties: {
            className: ['token', 'comment', 'hljs-comment']
        },
        children: [
            {
                type: 'text',
                value: comment
            }
        ]
    };
}
exports.createCommentNode = createCommentNode;
//# sourceMappingURL=common.js.map