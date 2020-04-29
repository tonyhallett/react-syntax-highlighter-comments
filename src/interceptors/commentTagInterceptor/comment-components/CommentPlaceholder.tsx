import { CommentTagType } from "./common";
export const CommentPlaceholder: CommentTagType=({commentDisplay: display, children})=>{
  if(display && children){
    return children;
      
  }
  return null as any;
}
CommentPlaceholder.displayName='CommentPlaceholder';