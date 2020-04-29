"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commentSymbolParser_1 = require("../../helpers/commentSymbolParser");
var angleBracketCaptureChar_1 = require("./angleBracketCaptureChar");
var mdLinkCaptureChar_1 = require("./mdLinkCaptureChar");
function createMdLinkLinkMatcher(target) {
    return function mdLinkLinkMatcher(comment) {
        var parsed = commentSymbolParser_1.commentSymbolParser(comment, mdLinkCaptureChar_1.mdLinkCaptureChar, angleBracketCaptureChar_1.angleBracketCaptureChar);
        if (parsed.length > 1) {
            for (var i = 0; i < parsed.length; i++) {
                var commentOrMdLink = parsed[i];
                if (typeof commentOrMdLink !== 'string') {
                    commentOrMdLink.linkProps = { target: target };
                }
            }
            return parsed;
        }
        return undefined;
    };
}
exports.createMdLinkLinkMatcher = createMdLinkLinkMatcher;
//# sourceMappingURL=createMdLinkLinkMatcher.js.map