"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tripleAsteriskCommentStylerCreator_1 = require("../styler creators/tripleAsteriskCommentStylerCreator");
function createTripleAsteriskCommentColourer(color) {
    return tripleAsteriskCommentStylerCreator_1.createTripleAsteriskCommentStyler({ color: color });
}
exports.createTripleAsteriskCommentColourer = createTripleAsteriskCommentColourer;
exports.redTripleAsteriskCommentColourer = createTripleAsteriskCommentColourer('red');
//# sourceMappingURL=tripleAsteriskCommentColourer.js.map