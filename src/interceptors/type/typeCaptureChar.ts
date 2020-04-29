import { ProcessResult } from "../../helpers/commentSymbolParser";
import { StringToObjectParser } from "string-object-to-object";
import { StringToObjectCaptureChar } from "../../helpers/StringToObjectCaptureChar";

export interface TypeCaptureResult{
  name:string,
  props?:{}
}
export class TypeCaptureChar extends StringToObjectCaptureChar<TypeCaptureResult> {
  private props:object|undefined;
  
  char = '&';
  result: TypeCaptureResult | undefined;
  name = '';
  ignoringNameWhitespace= false;
  protected stringToObjectCompleted(completed: object): void {
    this.props = completed;
  }
  reset = () => {
    this.result = undefined;
    this.stringToObjectParser = undefined;
    this.name = '';
    this.ignoringNameWhitespace = false;
    this.props = undefined;
  };
  process = (char: string) => {
    if (char === this.char) {
      if (this.stringToObjectParser === undefined) {
        //if undefined either have not encountered { or 
        //has parsed props and there is a result
        if (this.result === undefined) {
          if (this.processedText === '') {
            return ProcessResult.Break;
          }
          this.result = { name: this.processedText };
        }
        return ProcessResult.Completed;
      }
      else {
        return this.processWithStringToObjectParser(char);
      }
    }
    else {
      switch (char) {
        case '{':
          if(this.result || this.processedText === ''){
            return ProcessResult.Break;
          }
          if (this.stringToObjectParser === undefined) {
            this.stringToObjectParser = new StringToObjectParser();
            this.name = this.processedText;
            return ProcessResult.Continue;
          }
          else {
            //cannot complete
            return this.processWithStringToObjectParser(char);
          }
        default:
          if (this.stringToObjectParser) {
            const result = this.processWithStringToObjectParser(char);
            if (result === ProcessResult.Completed) {
              this.result = {
                name: this.name,
                props: this.props
              };
              return ProcessResult.Continue;
            }
            return result;
          }
          const isWhitespace = char.trim() === '';
          
          if(this.result){
            return isWhitespace ? ProcessResult.Continue:ProcessResult.Break;
          }

          // the name
          if (this.processedText === '' && isWhitespace) {
            return ProcessResult.Break;
          }
          if (isWhitespace) {
            this.ignoringNameWhitespace = true
            return ProcessResult.ContinueNoCapture;
          }
          if(this.ignoringNameWhitespace){
            return ProcessResult.Break;
          }
          const aToZ = char.match(/[a-zA-Z]/);
          return aToZ ? ProcessResult.Continue : ProcessResult.Break;
      }
    }
  };
  getCompleted = () => {
    return this.result!;
  };
}

export const typeCaptureChar = new TypeCaptureChar();
