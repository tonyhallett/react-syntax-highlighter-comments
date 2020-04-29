"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../../common");
function createLinksAndComments(commentLinkMatch) {
    return commentLinkMatch.map(function (commentOrLink) {
        if (typeof commentOrLink === 'string') {
            return common_1.createCommentNode(commentOrLink);
        }
        return createLinkNode(commentOrLink.url, commentOrLink.linkStyle, commentOrLink.linkText, commentOrLink.linkProps, commentOrLink.linkType);
    });
}
exports.createLinksAndComments = createLinksAndComments;
function createLinkNode(href, style, text, props, type) {
    var linkNode = {
        type: 'element',
        tagName: type ? type : 'a',
        properties: __assign({ className: ['link'], href: href,
            style: style }, props),
        children: [
            {
                type: 'text',
                value: text ? text : href
            }
        ]
    };
    return linkNode;
}
exports.createLinkNode = createLinkNode;
//# sourceMappingURL=createLinksAndComments.js.map