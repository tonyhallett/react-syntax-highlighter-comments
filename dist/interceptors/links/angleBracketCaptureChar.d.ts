import { CaptureChar, ProcessResult } from "../../helpers/commentSymbolParser";
import { MdLink } from "./mdLink";
export declare class AngleBracketCaptureChar implements CaptureChar<MdLink> {
    char: string;
    getCompleted: () => {
        url: string;
    };
    process: (char: string) => ProcessResult.Continue | ProcessResult.Completed | ProcessResult.Break;
    processedText: string;
}
export declare const angleBracketCaptureChar: AngleBracketCaptureChar;
