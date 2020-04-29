"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function nodeIsTag(node) {
    return node.type === 'element' && node.properties.className.indexOf('tag') !== -1;
}
exports.nodeIsTag = nodeIsTag;
//# sourceMappingURL=nodeHelpers.js.map