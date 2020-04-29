import { CaptureChar, ProcessResult } from "../../helpers/commentSymbolParser";
import { MdLink } from "./mdLink";

export enum MdLinkState {OpenSquare,ClosedSquare,OpenRound}
export class MdLinkCaptureChar implements CaptureChar<MdLink> {
  private state = MdLinkState.OpenSquare;
  
  url = '';
  linkText = '';
  char = '[';
  processedText = '';
  reset = () => {
    this.linkText = '';
    this.url = '';
    this.state = MdLinkState.OpenSquare;
  };
  getCompleted = () => {
    const mdLink = {
      url: this.url,
      linkText: this.linkText
    };
    return mdLink;
  };
  process = (char: string) => {
    switch (char) {
      case '[':
        return ProcessResult.Break;
      case ']':
        if (this.state === MdLinkState.OpenSquare && this.linkText.length > 0) {
          this.state = MdLinkState.ClosedSquare;
          return ProcessResult.Continue;
        }
        return ProcessResult.Break;
      case '(':
        switch (this.state) {
          case MdLinkState.OpenSquare:
            this.linkText += '(';
            return ProcessResult.Continue;
          case MdLinkState.ClosedSquare:
            this.state = MdLinkState.OpenRound;
            return ProcessResult.Continue;
          case MdLinkState.OpenRound:
            return ProcessResult.Break;
        }
      case ')':
        switch (this.state) {
          case MdLinkState.OpenSquare:
            this.linkText += ')';
            return ProcessResult.Continue;
          case MdLinkState.ClosedSquare:
            return ProcessResult.Break;
          case MdLinkState.OpenRound:
            return this.url.length === 0 ? ProcessResult.Break : ProcessResult.Completed;
        }
      default:
        switch (this.state) {
          case MdLinkState.OpenSquare:
            this.linkText += char;
            return ProcessResult.Continue;
          case MdLinkState.ClosedSquare:
            return ProcessResult.Break;
          case MdLinkState.OpenRound:
            this.url += char;
            return ProcessResult.Continue;
        }
    }
  };
}

export const mdLinkCaptureChar = new MdLinkCaptureChar();
