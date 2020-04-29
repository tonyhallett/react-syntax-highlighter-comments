"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../common");
var commentHofs_1 = require("../helpers/commentHofs");
var commentSymbolParser_1 = require("../helpers/commentSymbolParser");
var esFeatures_1 = require("../helpers/esFeatures");
function createCommentSplitter(splitter) {
    return commentHofs_1.createCommentNodeRenderInterceptor(function (nodeRenderDetails) {
        var comment = common_1.getCommentTextNode(nodeRenderDetails.node).value;
        var newComments = splitter(comment);
        if (newComments && newComments.length > 1) {
            var newNodeDetails = {
                key: nodeRenderDetails.key,
                stylesheet: nodeRenderDetails.stylesheet,
                useInlineStyles: nodeRenderDetails.useInlineStyles,
                node: {
                    properties: {
                        className: [],
                    },
                    type: 'element',
                    tagName: 'span',
                    children: newComments.map(function (newComment) { return common_1.createCommentNode(newComment); })
                }
            };
            return newNodeDetails;
        }
        return nodeRenderDetails;
    });
}
exports.createCommentSplitter = createCommentSplitter;
var DollarCaptureChar = /** @class */ (function () {
    function DollarCaptureChar() {
        var _this = this;
        this.char = '$';
        this.process = function (char) {
            if (char === _this.char) {
                return commentSymbolParser_1.ProcessResult.Completed;
            }
            return commentSymbolParser_1.ProcessResult.Continue;
        };
        this.getCompleted = function () {
            return _this.processedText;
        };
        this.processedText = '';
    }
    return DollarCaptureChar;
}());
var dollarCaptureChar = new DollarCaptureChar();
exports.dollarCommentSplitter = createCommentSplitter(function (comment) {
    var result = commentSymbolParser_1.commentSymbolParser(comment, dollarCaptureChar);
    if (result.length > 1) {
        result = result.map(function (r, i) {
            if (i === 0) {
                return r;
            }
            else {
                if (r.indexOf(' ') === 0) {
                    return r.substr(1);
                }
                return r;
            }
        });
    }
    return result;
});
// this is for if you do not want to colour // | /* */  the same as the comment
// useful if want to match the behaviour of dollar comment splitting above
exports.splitCommentChars = createCommentSplitter(function (comment) {
    var split;
    if (comment.length > 2) {
        if (esFeatures_1.stringStartsWith(comment, '//')) {
            split = [comment.substr(0, 2), comment.substr(2)];
        }
        else if (esFeatures_1.stringStartsWith(comment, '/*')) {
            split = [comment.substr(0, 2), comment.substr(2, comment.length - 4), comment.substr(comment.length - 2)];
        }
    }
    return split;
});
//# sourceMappingURL=commentSplitters.js.map