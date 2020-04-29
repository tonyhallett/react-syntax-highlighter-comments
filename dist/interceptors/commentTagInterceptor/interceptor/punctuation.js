"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function nodeIsPunctation(node) {
    return node.type === 'element' && node.properties.className.indexOf('punctuation') !== -1;
}
exports.nodeIsPunctation = nodeIsPunctation;
function getPunctuation(punctuationNode) {
    return punctuationNode.children[0].value;
}
exports.getPunctuation = getPunctuation;
//# sourceMappingURL=punctuation.js.map