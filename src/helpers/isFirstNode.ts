import { NodeRenderDetails } from "react-syntax-highlighter-renderer-interceptor";
export const isFirstNode = (nodeRenderDetails:NodeRenderDetails) => {
   return nodeRenderDetails.key==='code-segment-0';
}