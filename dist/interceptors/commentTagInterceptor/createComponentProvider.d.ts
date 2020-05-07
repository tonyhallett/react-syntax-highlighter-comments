import { ComponentProvider } from "./interceptor/types";
export declare const createComponentProvider: (components: any[]) => ComponentProvider;
export declare const createComponentFinder: (components: any[]) => (tagName: string) => any;
