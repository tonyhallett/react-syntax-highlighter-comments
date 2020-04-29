import { arrayFind } from "./esFeatures";

export enum ProcessResult{Continue,ContinueNoCapture,Completed,Break} 


export interface CaptureChar<T=any>{
  char:string,
  process:(char:string)=>ProcessResult,
  getCompleted:()=>T,
  processedText:string,
  reset?:()=>void
}

export function commentSymbolParser<T>(comment:string,...captureChars:CaptureChar<T>[]):Array<string|T>{
  if(captureChars.length===0){
    throw new Error('no capture chars');
  }
  const result:Array<string|T> = [];
  let currentCaptureChar:CaptureChar<T>|undefined;
  let currentComment = '';
  let processingText ='';
  function setCurrentCaptureChar(char:string){
    let didSet = false;
    if(currentCaptureChar===undefined){
      currentCaptureChar = arrayFind(captureChars,(cc=>cc.char === char));
      didSet = true;
    }
    return didSet;
  }
  function reset(){
    if(currentCaptureChar){
      currentCaptureChar.processedText='';
      currentCaptureChar.reset && currentCaptureChar!.reset();
      currentCaptureChar = undefined;
      processingText = '';
    }
  }
  
  function processText(text:string){
    for (var x = 0, c=''; c = text.charAt(x); x++) { 
      const didSet = setCurrentCaptureChar(c);
      if(currentCaptureChar===undefined){
        currentComment+=c;
      }else{
        if(!didSet){
          const processResult = currentCaptureChar.process(c);
          switch(processResult){
            case ProcessResult.Completed:
              if(currentComment){
                result.push(currentComment);
                currentComment = '';
              }
              result.push(currentCaptureChar.getCompleted());
              reset();
              break;
            case ProcessResult.Break:
              currentComment+=currentCaptureChar.char;
              const backtrackText = processingText + c;
              reset();
              processText(backtrackText);
              break;
            case ProcessResult.Continue:
              currentCaptureChar.processedText+=c;
              processingText+=c;
              break;
            case ProcessResult.ContinueNoCapture:
              processingText+=c;
              break;
          }
        }
      }
    }
  }
  processText(comment);
  while(currentCaptureChar!==undefined){
    currentComment+=currentCaptureChar.char;
    const backtrackText = processingText;
    reset();
    processText(backtrackText);
  }
  if(currentComment){
    result.push(currentComment);
  }
  return result
}