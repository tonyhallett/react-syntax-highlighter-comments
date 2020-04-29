import { StyleCreator } from "react-syntax-highlighter-renderer-interceptor";
import { createCommentStyleCreator } from "../../helpers/commentHofs";
import { getCommentTextNode } from "../../common";

//matchCharsRegexPart - must escape \
export function createCommentRegex(matchCharsRegexPart:string){
  return new RegExp(`(.*?)(${matchCharsRegexPart})(.*)`);
}
export const commentRegexReplaceString = '$1$3';
//matchCharsRegexPart - must escape \
export function createCommentMatchReplaceStylerRegexString(matchCharsRegexPart: string, matchStyle:React.CSSProperties, replaceString = commentRegexReplaceString) {
  const regex = createCommentRegex(matchCharsRegexPart);
  const commentMatchReplaceStyler: StyleCreator = createCommentStyleCreator((currentStyle, classNames, node) => {
    const commentTextNode = getCommentTextNode(node);
    const comment = commentTextNode.value;
    const replaced = comment.replace(regex, replaceString);
    if (replaced !== comment) {
      commentTextNode.value = replaced;
      return {
        ...currentStyle,
        ...matchStyle
      };
    }
    return currentStyle;
  });
  return commentMatchReplaceStyler;
}

export type CommentReplacer = (comment:string)=>{newComment:string,matchStyle:React.CSSProperties}|undefined
export function createCommentMatchReplaceStylerFn(commentReplacer:CommentReplacer) {
  const commentMatchReplaceStyler: StyleCreator = createCommentStyleCreator((currentStyle, classNames, node) => {
    const commentTextNode = getCommentTextNode(node);
    const comment = commentTextNode.value;

    const replaced = commentReplacer(comment);
    if (replaced) {
      commentTextNode.value = replaced.newComment;
      return {
        ...currentStyle,
        ...replaced.matchStyle
      };
    }
    return currentStyle;
  });
  return commentMatchReplaceStyler;
}
export interface StringReplaceArgs{
  replace:RegExp|string,replaceString?:string,matchStyle:React.CSSProperties
}
export type CommentMatchReplaceStyler = CommentReplacer|StringReplaceArgs;
export function createCommentMatchReplaceStyler(replacer:CommentMatchReplaceStyler) {
  let replacerFn:CommentReplacer;
  if(typeof replacer === 'object'){
    replacerFn = (comment:string) => {
      const replaceString = replacer.replaceString?replacer.replaceString:'$1$3';
      const replaced = comment.replace(replacer.replace, replaceString);
      if(replaced!==comment){
        return {
          newComment:replaced,
          matchStyle:replacer.matchStyle
        }
      }
      return undefined;
    }
  }else{
    replacerFn=replacer;
  }
  const commentMatchReplaceStyler: StyleCreator = createCommentStyleCreator((currentStyle, classNames, node) => {
    const commentTextNode = getCommentTextNode(node);
    const comment = commentTextNode.value;

    const replaced = replacerFn(comment);
    if (replaced) {
      commentTextNode.value = replaced.newComment;
      return {
        ...currentStyle,
        ...replaced.matchStyle
      };
    }
    return currentStyle;
  });
  return commentMatchReplaceStyler;
}




export function createMatchNOrMoreRegexPart(matchCharsRegexPart:string, numMatches:number){
  return `${matchCharsRegexPart}{${numMatches},}`
}
//todo understand how to set up the regex to match exactly - see https://stackoverflow.com/questions/43174409/regex-that-matches-no-more-than-n-occurrences
export function createCommentMatchNOrMoreReplaceStyler(matchCharsRegexPart:string, matchStyle:React.CSSProperties,numMatches:number){
  return createCommentMatchReplaceStylerRegexString(createMatchNOrMoreRegexPart(matchCharsRegexPart,numMatches),matchStyle);
}

