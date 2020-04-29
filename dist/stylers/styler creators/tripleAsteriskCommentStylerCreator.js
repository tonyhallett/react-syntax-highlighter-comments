"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createCommentMatchReplaceStyler_1 = require("./createCommentMatchReplaceStyler");
function createTripleAsteriskCommentStyler(asteriskCommentStyle) {
    return createCommentMatchReplaceStyler_1.createCommentMatchReplaceStylerRegexString(' ?\\*\\*\\*', asteriskCommentStyle);
}
exports.createTripleAsteriskCommentStyler = createTripleAsteriskCommentStyler;
//# sourceMappingURL=tripleAsteriskCommentStylerCreator.js.map