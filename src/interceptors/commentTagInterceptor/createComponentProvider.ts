import { ComponentProvider } from "./interceptor/types";

export const createComponentProvider = (components:any[]) => {
  const finder = createComponentFinder(components);
  const componentProvider:ComponentProvider = ( tagName) => {
    return finder(tagName);
  }
  return componentProvider;
}

export const createComponentFinder = (components:any[]) => {
  function find(tagName:string){
    return components.find(ct=>ct.displayName.toLowerCase() === tagName.toLowerCase()) as any
  }
  return ( tagName:string) => {
    const parts = tagName.split('.');
    if(parts.length===1){
      return find(tagName);
    }else{
      return find(parts[parts.length-1]);
    }
  }
}