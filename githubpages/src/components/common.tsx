import React from "react";
import { Prism } from "react-syntax-highlighter"
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { CommentLinksAndColours } from "../../../src";

const Api:React.FC<{header:string}> = ({children,header})=>{
  return <Expandable header={header}>
    <CommentLinksAndColours 
        commentLinks={false} 
        commentClasses={false} 
        commentRemoval={false} 
        dollarCommentSplit={false}
        splitCommentChars={false}>
          <Prism language='tsx'>
            {children}
          </Prism>
    </CommentLinksAndColours>
  </Expandable>
}
export const ComponentApi:React.FC= ({children}) => {
  return <Api header='Component API'>{children}</Api>
}
export const InterceptorApi:React.FC<{isInterceptor?:boolean}>= ({children,isInterceptor=true}) => {
  return <Api header={`${isInterceptor?'Interceptor':'Style Creator'} API`}>{children}</Api>
}

export const Expandable:React.FC<{header:string}> = ({header, children})=>{
  return <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>{header}</Typography>
          </ExpansionPanelSummary>
              {children}
          </ExpansionPanel>
}