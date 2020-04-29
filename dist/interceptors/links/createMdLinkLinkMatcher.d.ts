export declare type LinkTarget = '_self' | '_blank' | '_parent' | '_top';
export declare function createMdLinkLinkMatcher(target: LinkTarget): (comment: string) => (string | {
    url: string;
})[] | undefined;
