import { commentSymbolParser } from "../../helpers/commentSymbolParser";
import { angleBracketCaptureChar } from "./angleBracketCaptureChar";
import { mdLinkCaptureChar } from "./mdLinkCaptureChar";
export type LinkTarget = '_self'|'_blank' | '_parent' | '_top';
export function createMdLinkLinkMatcher(target: LinkTarget) {
  return function mdLinkLinkMatcher(comment: string) {
    const parsed = commentSymbolParser(comment, mdLinkCaptureChar, angleBracketCaptureChar);
    if (parsed.length > 1) {
      for (let i = 0; i < parsed.length; i++) {
        const commentOrMdLink = parsed[i];
        if (typeof commentOrMdLink !== 'string') {
          (commentOrMdLink as any).linkProps = { target };
        }
      }
      return parsed;
    }
    return undefined;
  };
}
