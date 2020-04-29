/// <reference types="react" />
export interface TypeInterceptorDetails {
    name: string;
    component: React.ComponentType;
}
export declare function createTypeInterceptor(...typeDetails: TypeInterceptorDetails[]): import("react-syntax-highlighter-renderer-interceptor").NodeRenderInterceptor;
