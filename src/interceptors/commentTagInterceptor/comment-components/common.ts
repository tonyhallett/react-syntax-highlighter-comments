import { CommentTagProps } from "../interceptor";

export function getSpacing(tabNumber:number){
  let spacing='';
  for(let i=0;i<tabNumber;i++){
    spacing+=' ';
  }
  return spacing;
}

export type CommentTagType<PAdditional={}> = React.FC<CommentTagProps & PAdditional>&{displayName:string};