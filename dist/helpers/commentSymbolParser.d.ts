export declare enum ProcessResult {
    Continue = 0,
    ContinueNoCapture = 1,
    Completed = 2,
    Break = 3
}
export interface CaptureChar<T = any> {
    char: string;
    process: (char: string) => ProcessResult;
    getCompleted: () => T;
    processedText: string;
    reset?: () => void;
}
export declare function commentSymbolParser<T>(comment: string, ...captureChars: CaptureChar<T>[]): Array<string | T>;
