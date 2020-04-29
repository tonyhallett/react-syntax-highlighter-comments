"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createCommentMatchReplaceStyler_1 = require("./styler creators/createCommentMatchReplaceStyler");
var singleLine = '//';
var multilineStart = '/*';
var multilineEnd = '*/';
exports.createCommentCharsStyler = function (stylingOptions) {
    return createCommentMatchReplaceStyler_1.createCommentMatchReplaceStylerFn(function (comment) {
        var appliedStyle;
        if (comment === singleLine) {
            appliedStyle = stylingOptions.singleLineStyle ? stylingOptions.singleLineStyle : stylingOptions.allStyle;
        }
        else if (comment === multilineStart) {
            appliedStyle = stylingOptions.multilineStartStyle ? stylingOptions.multilineStartStyle : stylingOptions.multilineStyle ? stylingOptions.multilineStyle : stylingOptions.allStyle;
        }
        else if (comment === multilineEnd) {
            appliedStyle = stylingOptions.multilineEndStyle ? stylingOptions.multilineEndStyle : stylingOptions.multilineStyle ? stylingOptions.multilineStyle : stylingOptions.allStyle;
        }
        if (appliedStyle) {
            return {
                newComment: comment,
                matchStyle: appliedStyle
            };
        }
    });
};
//# sourceMappingURL=commentCharsStyler.js.map