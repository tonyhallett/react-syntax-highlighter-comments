"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//have sufficient to test - commentComponentInterceptor
function getProperties(properties) {
    return "\n{\n  className:[" + properties.className.map(function (cn) { return "'" + cn + "'"; }).join(',') + "]\n}";
}
function getChildren(children) {
    return "\n  [" + children.map(function (c) { return getNode(c); }).join(',') + "]\n  ";
}
function getElementNode(node) {
    return "\n{\n  type:'" + node.type + "',\n  tagName:'" + node.tagName + "',\n  properties:" + getProperties(node.properties) + ",\n  children:" + getChildren(node.children) + "\n}\n  ";
}
function getNode(node) {
    if (node.type === 'text') {
        return "\n{\n  type:'text',\n  value:\"" + node.value + "\"\n}";
    }
    else {
        return getElementNode(node);
    }
}
function logNodeRenderDetails(nodeRenderDetails) {
    console.log("\n{\n  node:" + getNode(nodeRenderDetails.node) + "\n}");
}
exports.loggingInterceptor = (function (nodeRenderDetails) {
    var node = nodeRenderDetails.node;
    if (node.type === 'element') {
        if (node.properties.className.some(function (c) { return c === 'tag'; })) {
            //logNodeRenderDetails(nodeRenderDetails)
        }
    }
    return nodeRenderDetails;
});
//# sourceMappingURL=loggingInterceptor.js.map