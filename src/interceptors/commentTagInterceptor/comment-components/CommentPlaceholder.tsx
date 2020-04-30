import { CommentTagType } from "./common";
export const CommentPlaceholder: CommentTagType=({commentDisplay, children})=>{
  if(commentDisplay && children){
    return children;
      
  }
  return null as any;
}
CommentPlaceholder.displayName='CommentPlaceholder';