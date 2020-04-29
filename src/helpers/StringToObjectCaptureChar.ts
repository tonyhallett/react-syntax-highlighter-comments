import { CaptureChar, ProcessResult } from "./commentSymbolParser";
import { StringToObjectParser, ProcessResult as StringToObjectResult } from "string-object-to-object";
export abstract class StringToObjectCaptureChar<T> implements CaptureChar<T> {
  abstract char: string;
  abstract process(char: string):ProcessResult;
  abstract getCompleted():T;
  processedText = '';
  stringToObjectParser: StringToObjectParser | undefined;
  protected processWithStringToObjectParser(char: string): ProcessResult {
    const stringToObjectResult = this.stringToObjectParser!.process(char);
    switch (stringToObjectResult) {
      case StringToObjectResult.Break:
        return ProcessResult.Break;
      case StringToObjectResult.Completed:
        this.stringToObjectCompleted(this.stringToObjectParser!.getCompleted())
        this.stringToObjectParser = undefined;
        return ProcessResult.Completed;
      case StringToObjectResult.Continue:
        return ProcessResult.Continue;
    }
  }
  protected abstract stringToObjectCompleted(completed:object):void
}
