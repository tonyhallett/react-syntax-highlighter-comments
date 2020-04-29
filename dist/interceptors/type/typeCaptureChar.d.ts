import { ProcessResult } from "../../helpers/commentSymbolParser";
import { StringToObjectCaptureChar } from "../../helpers/StringToObjectCaptureChar";
export interface TypeCaptureResult {
    name: string;
    props?: {};
}
export declare class TypeCaptureChar extends StringToObjectCaptureChar<TypeCaptureResult> {
    private props;
    char: string;
    result: TypeCaptureResult | undefined;
    name: string;
    ignoringNameWhitespace: boolean;
    protected stringToObjectCompleted(completed: object): void;
    reset: () => void;
    process: (char: string) => ProcessResult.Continue | ProcessResult.Continue | ProcessResult.ContinueNoCapture | ProcessResult | ProcessResult.Break;
    getCompleted: () => TypeCaptureResult;
}
export declare const typeCaptureChar: TypeCaptureChar;
