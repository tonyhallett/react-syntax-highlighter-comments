import { createTripleAsteriskCommentStyler } from "../styler creators/tripleAsteriskCommentStylerCreator";

export function createTripleAsteriskCommentColourer(color:string){
  return createTripleAsteriskCommentStyler({color})
}

export const redTripleAsteriskCommentColourer = createTripleAsteriskCommentColourer('red');