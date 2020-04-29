import { CaptureChar, ProcessResult } from "./commentSymbolParser";
import { StringToObjectParser } from "string-object-to-object";
export declare abstract class StringToObjectCaptureChar<T> implements CaptureChar<T> {
    abstract char: string;
    abstract process(char: string): ProcessResult;
    abstract getCompleted(): T;
    processedText: string;
    stringToObjectParser: StringToObjectParser | undefined;
    protected processWithStringToObjectParser(char: string): ProcessResult;
    protected abstract stringToObjectCompleted(completed: object): void;
}
