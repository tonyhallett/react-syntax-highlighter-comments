import React from "react"
import { ExampleCode, createOnlyComponentProvider } from "./common";
import { CommentReactIcon } from "../../../../../src";
import Typography from '@material-ui/core/Typography';

export const DemoCommentReactIcon:React.FC = ()=> {
  return <>
    <Typography>Nothing to explain here.</Typography>
    <ExampleCode commentTagProvider={createOnlyComponentProvider(CommentReactIcon)}>
      {`<CommentReactIcon/>`}
    </ExampleCode>
  </>
}