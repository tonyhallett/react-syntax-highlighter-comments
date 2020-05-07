import React from "react"
import { ExampleCode } from "./common";
import { CommentReactIcon, createComponentProvider } from "../../../../../src";
import Typography from '@material-ui/core/Typography';

export const DemoCommentReactIcon:React.FC = ()=> {
  return <>
    <Typography>Nothing to explain here.</Typography>
    <ExampleCode commentTagProvider={createComponentProvider([CommentReactIcon])}>
      {`<CommentReactIcon/>`}
    </ExampleCode>
  </>
}