import * as React from "react";
import { DemoCommentTagInterceptor } from "./demoCommentTagInterceptor/demoCommentTagInterceptor";

export class DemoRSHComment extends React.Component<{},{splitComment:boolean}>{
  constructor(props:{}){
    super(props);
    this.state={splitComment:true}
  }
  render(){
    return <>
    {/* <DemoCommentLinksAndClasses/>
    <DemoCommentLinksAndColours/> */}

    {/* <DemoSyntaxHighlighterComments/> */}
    <DemoCommentTagInterceptor/>
    </>
  }
}
