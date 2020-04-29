"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var voidElements = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
function isVoidElement(tagName) {
    return voidElements.indexOf(tagName) !== -1;
}
exports.isVoidElement = isVoidElement;
//# sourceMappingURL=isVoidElement.js.map