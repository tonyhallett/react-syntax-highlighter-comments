const voidElements = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
export function isVoidElement(tagName:string):boolean{
  return voidElements.indexOf(tagName)!==-1;
}