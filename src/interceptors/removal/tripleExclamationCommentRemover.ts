import { createCommentRemover } from "./commentRemover";

//3 or more
export const tripleExclamationCommentRemover = createCommentRemover(/\!{3}/);