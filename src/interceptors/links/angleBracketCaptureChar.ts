import { CaptureChar, ProcessResult } from "../../helpers/commentSymbolParser";
import { MdLink } from "./mdLink";
export class AngleBracketCaptureChar implements CaptureChar<MdLink> {
  char = '<';
  getCompleted = () => {
    return {
      url: this.processedText
    };
  };
  process = (char: string) => {
    if (char.trim() === '') {
      return ProcessResult.Break;
    }
    switch (char) {
      case '<':
        return ProcessResult.Break;
      case '>':
        if (this.processedText.length === 0) {
          return ProcessResult.Break;
        }
        return ProcessResult.Completed;
      default:
        return ProcessResult.Continue;
    }
  };
  processedText = '';
}
export const angleBracketCaptureChar = new AngleBracketCaptureChar();
