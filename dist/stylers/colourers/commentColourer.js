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
var commentHofs_1 = require("../../helpers/commentHofs");
var react_syntax_highlighter_renderer_interceptor_1 = require("react-syntax-highlighter-renderer-interceptor");
var colorNames_1 = require("../../helpers/colorNames");
/*
  https://www.regextester.com/97509 I have removed g
  does not match against
    Functional notation: rgb[a](R G B[ / A])
    CSS Colors Level 4 adds support for space-separated values in the functional notation.
*/
exports.colorMatcher = /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/i;
exports.commentColourer = commentHofs_1.createCommentStyleCreator(function (currentStyle, className, node) {
    var commentTextNode = common_1.getCommentTextNode(node);
    var comment = commentTextNode.value;
    var match = exports.colorMatcher.exec(comment);
    if (match) {
        var found = match[0];
        var index = match.index;
        var replaced = match.input.substr(0, index) + match.input.substring(match.index + found.length);
        commentTextNode.value = replaced;
        return __assign(__assign({}, currentStyle), { 'color': found });
    }
    else {
        for (var i = 0; i < colorNames_1.colorNames.length; i++) {
            var colorName = colorNames_1.colorNames[i];
            var regEx = new RegExp("#" + colorName[0], "ig");
            var replaced = comment.replace(regEx, '');
            if (replaced !== comment) {
                commentTextNode.value = replaced;
                return __assign(__assign({}, currentStyle), { color: colorName[1] });
            }
        }
        return currentStyle;
    }
});
exports.commentColourRenderer = react_syntax_highlighter_renderer_interceptor_1.createCustomRenderer(exports.commentColourer);
//# sourceMappingURL=commentColourer.js.map