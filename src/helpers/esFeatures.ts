export function arrayFind<T>(arr:Array<T>,predicate:(item:T)=>boolean){
  for(let i = 0;i<arr.length;i++){
    const item = arr[i];
    if(predicate(item)){
      return item;
    }
  }
}
export function stringStartsWith(searchString:string,chars:string){
  return searchString.indexOf(chars)===0;
}