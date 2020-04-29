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
var commentHofs_1 = require("../../helpers/commentHofs");
var common_1 = require("../../common");
//matchCharsRegexPart - must escape \
function createCommentRegex(matchCharsRegexPart) {
    return new RegExp("(.*?)(" + matchCharsRegexPart + ")(.*)");
}
exports.createCommentRegex = createCommentRegex;
exports.commentRegexReplaceString = '$1$3';
//matchCharsRegexPart - must escape \
function createCommentMatchReplaceStylerRegexString(matchCharsRegexPart, matchStyle, replaceString) {
    if (replaceString === void 0) { replaceString = exports.commentRegexReplaceString; }
    var regex = createCommentRegex(matchCharsRegexPart);
    var commentMatchReplaceStyler = commentHofs_1.createCommentStyleCreator(function (currentStyle, classNames, node) {
        var commentTextNode = common_1.getCommentTextNode(node);
        var comment = commentTextNode.value;
        var replaced = comment.replace(regex, replaceString);
        if (replaced !== comment) {
            commentTextNode.value = replaced;
            return __assign(__assign({}, currentStyle), matchStyle);
        }
        return currentStyle;
    });
    return commentMatchReplaceStyler;
}
exports.createCommentMatchReplaceStylerRegexString = createCommentMatchReplaceStylerRegexString;
function createCommentMatchReplaceStylerFn(commentReplacer) {
    var commentMatchReplaceStyler = commentHofs_1.createCommentStyleCreator(function (currentStyle, classNames, node) {
        var commentTextNode = common_1.getCommentTextNode(node);
        var comment = commentTextNode.value;
        var replaced = commentReplacer(comment);
        if (replaced) {
            commentTextNode.value = replaced.newComment;
            return __assign(__assign({}, currentStyle), replaced.matchStyle);
        }
        return currentStyle;
    });
    return commentMatchReplaceStyler;
}
exports.createCommentMatchReplaceStylerFn = createCommentMatchReplaceStylerFn;
function createCommentMatchReplaceStyler(replacer) {
    var replacerFn;
    if (typeof replacer === 'object') {
        replacerFn = function (comment) {
            var replaceString = replacer.replaceString ? replacer.replaceString : '$1$3';
            var replaced = comment.replace(replacer.replace, replaceString);
            if (replaced !== comment) {
                return {
                    newComment: replaced,
                    matchStyle: replacer.matchStyle
                };
            }
            return undefined;
        };
    }
    else {
        replacerFn = replacer;
    }
    var commentMatchReplaceStyler = commentHofs_1.createCommentStyleCreator(function (currentStyle, classNames, node) {
        var commentTextNode = common_1.getCommentTextNode(node);
        var comment = commentTextNode.value;
        var replaced = replacerFn(comment);
        if (replaced) {
            commentTextNode.value = replaced.newComment;
            return __assign(__assign({}, currentStyle), replaced.matchStyle);
        }
        return currentStyle;
    });
    return commentMatchReplaceStyler;
}
exports.createCommentMatchReplaceStyler = createCommentMatchReplaceStyler;
function createMatchNOrMoreRegexPart(matchCharsRegexPart, numMatches) {
    return matchCharsRegexPart + "{" + numMatches + ",}";
}
exports.createMatchNOrMoreRegexPart = createMatchNOrMoreRegexPart;
//todo understand how to set up the regex to match exactly - see https://stackoverflow.com/questions/43174409/regex-that-matches-no-more-than-n-occurrences
function createCommentMatchNOrMoreReplaceStyler(matchCharsRegexPart, matchStyle, numMatches) {
    return createCommentMatchReplaceStylerRegexString(createMatchNOrMoreRegexPart(matchCharsRegexPart, numMatches), matchStyle);
}
exports.createCommentMatchNOrMoreReplaceStyler = createCommentMatchNOrMoreReplaceStyler;
//# sourceMappingURL=createCommentMatchReplaceStyler.js.map