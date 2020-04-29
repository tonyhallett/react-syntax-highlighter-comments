import { getCommentTextNode } from "../../common";
import { createCommentStyleCreator } from "../../helpers/commentHofs";
import { createCustomRenderer, CustomRenderer} from 'react-syntax-highlighter-renderer-interceptor'
import { colorNames } from "../../helpers/colorNames";

/*
  https://www.regextester.com/97509 I have removed g
  does not match against 
    Functional notation: rgb[a](R G B[ / A])
    CSS Colors Level 4 adds support for space-separated values in the functional notation.
*/
export const colorMatcher = /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/i;


export const commentColourer=createCommentStyleCreator((currentStyle, className,node)=>{
  const commentTextNode = getCommentTextNode(node);
  const comment = commentTextNode.value;
  const match = colorMatcher.exec(comment);
  if(match){
    const found = match[0];
    const index = match.index;
    const replaced = match.input.substr(0,index) + match.input.substring(match.index + found.length);
    commentTextNode.value = replaced;
    return {...currentStyle,'color':found};
  }else{
    for(let i=0;i<colorNames.length;i++){
      const colorName=colorNames[i];
      var regEx = new RegExp(`#${colorName[0]}`, "ig");
      const replaced = comment.replace(regEx,'');
      if(replaced!==comment){
        commentTextNode.value = replaced;
        return {
          ...currentStyle,
          color:colorName[1]
        }
      }
    }
    return currentStyle;
  }
});

export const commentColourRenderer:CustomRenderer = createCustomRenderer(commentColourer)


