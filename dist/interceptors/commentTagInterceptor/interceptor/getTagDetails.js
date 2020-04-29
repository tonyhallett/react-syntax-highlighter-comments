"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isVoidElement_1 = require("./isVoidElement");
var nodeHelpers_1 = require("./nodeHelpers");
var punctuation_1 = require("./punctuation");
var TagType;
(function (TagType) {
    TagType[TagType["Start"] = 0] = "Start";
    TagType[TagType["End"] = 1] = "End";
    TagType[TagType["SelfClosing"] = 2] = "SelfClosing";
})(TagType = exports.TagType || (exports.TagType = {}));
;
function nodeIsTagClassName(node) {
    return node.type === 'element' && node.properties.className.indexOf('class-name') !== -1;
}
exports.nodeIsTagClassName = nodeIsTagClassName;
function getTagDetails(node) {
    var firstChild = node.children[0];
    if (nodeHelpers_1.nodeIsTag(firstChild)) {
        var tagName = void 0;
        if (firstChild.children.length === 1) {
            tagName = 'Fragment';
        }
        else {
            var nameIdentifyingElement = firstChild.children[firstChild.children.length - 1];
            if (nodeIsTagClassName(nameIdentifyingElement)) {
                tagName = nameIdentifyingElement.children[0].value;
            }
            else if (nameIdentifyingElement.type === 'text') {
                tagName = nameIdentifyingElement.value;
            }
        }
        if (tagName !== undefined) {
            var firstPunctuationNode = firstChild.children[0];
            if (punctuation_1.nodeIsPunctation(firstPunctuationNode)) {
                var isEndTag = punctuation_1.getPunctuation(firstPunctuationNode) === '</';
                if (isEndTag) {
                    return { tagName: tagName, tagType: TagType.End };
                }
                else {
                    var secondPunctuationNode = node.children[node.children.length - 1];
                    if (punctuation_1.nodeIsPunctation(secondPunctuationNode)) {
                        var isSelfClosing = punctuation_1.getPunctuation(secondPunctuationNode) === '/>';
                        if (isSelfClosing || isVoidElement_1.isVoidElement(tagName)) {
                            return { tagName: tagName, tagType: TagType.SelfClosing };
                        }
                        return { tagName: tagName, tagType: TagType.Start };
                    }
                }
            }
        }
    }
}
exports.getTagDetails = getTagDetails;
//# sourceMappingURL=getTagDetails.js.map