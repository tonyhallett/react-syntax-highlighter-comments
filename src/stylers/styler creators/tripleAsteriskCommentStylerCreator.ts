import { createCommentMatchReplaceStylerRegexString } from "./createCommentMatchReplaceStyler";

export function createTripleAsteriskCommentStyler(asteriskCommentStyle:React.CSSProperties){
  return createCommentMatchReplaceStylerRegexString(' ?\\*\\*\\*',asteriskCommentStyle);
}







