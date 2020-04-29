import * as React from "react";
import { ComponentProvider } from "../../../../../src";
export declare const ExampleCode: React.FC<{
    additionalStyle?: React.CSSProperties;
    commentTagProvider: ComponentProvider;
    respectStyleProp?: boolean;
    rows?: number;
    columns?: number;
}>;
export declare const createOnlyComponentProvider: (only: any) => ComponentProvider;
