import { ProcessResult } from "../helpers/commentSymbolParser";
import { StringToObjectCaptureChar } from "../helpers/StringToObjectCaptureChar";
export declare enum NodeObjectPropertyCaptureCharState {
    Initial = 0,
    OpenSquare = 1,
    ClosedSquare = 2,
    StringToObject = 3
}
export interface NodeObjectPropertyCaptureCharResult {
    propertyName: string;
    value: object;
}
export declare class NodeObjectPropertyCaptureChar extends StringToObjectCaptureChar<NodeObjectPropertyCaptureCharResult> {
    private propertyName;
    private value;
    private state;
    char: string;
    reset(): void;
    process(char: string): ProcessResult.Continue | ProcessResult | ProcessResult.Break;
    getCompleted(): NodeObjectPropertyCaptureCharResult;
    protected stringToObjectCompleted(completed: object): void;
}
export declare const nodeObjectPropertyCaptureChar: NodeObjectPropertyCaptureChar;
export declare function createNodeObjectPropertyAttacher(): import("react-syntax-highlighter-renderer-interceptor").NodeRenderInterceptor;
