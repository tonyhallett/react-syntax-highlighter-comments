import { CaptureChar, ProcessResult } from "../helpers/commentSymbolParser";
export interface ReferenceStylerCaptureCharResult {
    classes: string;
}
export declare class ReferenceStylerCaptureChar implements CaptureChar<ReferenceStylerCaptureCharResult> {
    char: string;
    process(char: string): ProcessResult.Continue | ProcessResult.Completed;
    getCompleted(): {
        classes: string;
    };
    processedText: string;
}
export declare const referenceStylerCaptureChar: ReferenceStylerCaptureChar;
export declare const referenceStyler: import("react-syntax-highlighter-renderer-interceptor").StyleCreator;
