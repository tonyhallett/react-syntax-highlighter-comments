import { CaptureChar, ProcessResult } from "../../helpers/commentSymbolParser";
import { MdLink } from "./mdLink";
export declare enum MdLinkState {
    OpenSquare = 0,
    ClosedSquare = 1,
    OpenRound = 2
}
export declare class MdLinkCaptureChar implements CaptureChar<MdLink> {
    private state;
    url: string;
    linkText: string;
    char: string;
    processedText: string;
    reset: () => void;
    getCompleted: () => {
        url: string;
        linkText: string;
    };
    process: (char: string) => ProcessResult.Continue | ProcessResult.Completed | ProcessResult.Break;
}
export declare const mdLinkCaptureChar: MdLinkCaptureChar;
