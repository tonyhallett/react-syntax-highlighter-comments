import {typeCaptureChar} from '../../../src/interceptors/type/typeCaptureChar';
import { ProcessResult} from '../../../src/helpers/commentSymbolParser'
import { StringToObjectParser, ProcessResult as StringToObjectProcessResult} from 'string-object-to-object';
/* enum StringToObjectProcessResult {
  Continue = 0,
  Completed = 1,
  Break = 2
} */
let lastProcessChar:string|undefined;
let mockStringToObjectProcessResult!:StringToObjectProcessResult
let mockCompletedResult:object | undefined;
jest.mock('string-object-to-object', () => {
  return {
    StringToObjectParser:class Mocked{
      process(char:string):StringToObjectProcessResult{
        lastProcessChar = char;
        return mockStringToObjectProcessResult;
      }
      getCompleted():object{
        return mockCompletedResult!;
      }
    },
    ProcessResult:{
      Continue:0,
      Completed:1,
      Break:2
    }
  }
})
describe('typeCaptureChar', () => {
  afterEach(() => {
    typeCaptureChar.reset();
    typeCaptureChar.processedText='';
    lastProcessChar = undefined;
    mockCompletedResult = undefined;
    mockCompletedResult = undefined;
  })
  
  it('should have char &', () => {
    expect(typeCaptureChar.char).toEqual('&');
  })
  describe('initial state', () => {
    it(`should have processedText ''`, () => {
      expect(typeCaptureChar.processedText).toEqual('');
    })
    it(`should have name ''`, () => {
      expect(typeCaptureChar.name).toEqual('');
    })
    it(`should have ignoringNameWhitespace false ''`, () => {
      expect(typeCaptureChar.ignoringNameWhitespace).toBe(false);
    })
    it('should have result undefined', () => {
      expect(typeCaptureChar.result).toBeUndefined();
    })
    it('should have stringToObjectParser undefined', () => {
      expect(typeCaptureChar.stringToObjectParser).toBeUndefined();
    })
  })
  describe('process', () => {
    describe('name', () => {
      it('should break for no name', () => {
        expect(typeCaptureChar.process('&')).toEqual(ProcessResult.Break);
      })
      it('should break if starts with whitespace', () => {
        expect(typeCaptureChar.process(' ')).toEqual(ProcessResult.Break);
      })
      it('should continue if starts with a to z lowercase', () => {
        expect(typeCaptureChar.process('a')).toEqual(ProcessResult.Continue);
      })
      it('should continue if starts with a to z uppercase', () => {
        expect(typeCaptureChar.process('Z')).toEqual(ProcessResult.Continue);
      })
      it('should continue if has name and next a-z', () => {
        typeCaptureChar.processedText = 'name'
        expect(typeCaptureChar.process('e')).toEqual(ProcessResult.Continue);
      })
      it('should not allow non a-z characters', () => {
        expect(typeCaptureChar.process('*')).toEqual(ProcessResult.Break);
      })
      it('should allow whitespace and ignore after name', () => {
        typeCaptureChar.processedText = 'name';
        expect(typeCaptureChar.process(' ')).toEqual(ProcessResult.ContinueNoCapture);
        expect(typeCaptureChar.ignoringNameWhitespace).toBe(true);
      })
      it('should allow multiple whitespace and ignore after name', () => {
        typeCaptureChar.processedText = 'name ';
        typeCaptureChar.ignoringNameWhitespace = true;
        expect(typeCaptureChar.process(' ')).toEqual(ProcessResult.ContinueNoCapture);
      })
      it('should not allow &na me', () => {
        typeCaptureChar.processedText = 'na ';
        typeCaptureChar.ignoringNameWhitespace = true;
        expect(typeCaptureChar.process('m')).toEqual(ProcessResult.Break);
      })
      
    })
    
    describe('props', () => {
      function processWithStringToObject(strToObjResult:StringToObjectProcessResult, char:string,expectedResult:ProcessResult){
        typeCaptureChar.processedText = 'name';
        (typeCaptureChar as any).stringToObjectParser = new StringToObjectParser();//mock
        mockStringToObjectProcessResult = strToObjResult;
        expect(typeCaptureChar.process(char)).toBe(expectedResult === undefined ? mockStringToObjectProcessResult: expectedResult);
        expect(lastProcessChar).toBe(char);
      }
      describe('open curly', () => {
        it('should break if no name ( no processedText )', () => {
          expect(typeCaptureChar.process('{')).toEqual(ProcessResult.Break);
        });
        describe('has name ( processedText )', () => {
          let result:ProcessResult;
          beforeEach(()=>{
            typeCaptureChar.processedText = 'name';
            result = typeCaptureChar.process('{')
          })
          it('should create the stringToObjectParser', () => {
            expect(typeCaptureChar.stringToObjectParser).toBeDefined();
          })
          it('should set name to the processedText', () => {
            expect(typeCaptureChar.name).toBe('name');
          })
          it('should continue', () => {
            expect(result).toBe(ProcessResult.Continue);
          })
        })
        function processWithStringToObjectIfNotFirst(strToObjResult:StringToObjectProcessResult.Break|StringToObjectProcessResult.Continue){
          processWithStringToObject(strToObjResult, '{',strToObjResult===StringToObjectProcessResult.Break?ProcessResult.Break:ProcessResult.Continue)
        }
        it('should process with the StringToObjectParser if not the first - Continue', () => {
          processWithStringToObjectIfNotFirst(StringToObjectProcessResult.Continue);
        })
        it('should process with the StringToObjectParser if not the first - Break', () => {
          processWithStringToObjectIfNotFirst(StringToObjectProcessResult.Break);
        })
      })
      describe('other chars - props not determined', () => {
        it('should process with the stringToObjectParser - break', () => {
          processWithStringToObject(StringToObjectProcessResult.Break,'|',ProcessResult.Break);
        })
        it('should process with the stringToObjectParser - continue', () => {
          processWithStringToObject(StringToObjectProcessResult.Continue,'|',ProcessResult.Continue);
        })
        it('should process with the stringToObjectParser - Completed', () => {
          typeCaptureChar.name = 'name';
          mockCompletedResult = {
            some:'object'
          }
          //Continue as still need to close the &
          processWithStringToObject(StringToObjectProcessResult.Completed,'|', ProcessResult.Continue);
          expect(typeCaptureChar.stringToObjectParser).toBe(undefined);
          expect(typeCaptureChar.result).toEqual({name:'name',props:mockCompletedResult});
        })
      })
      
      
      describe('props determined', () => {
        it('should allow whitespace after result', () => {
          typeCaptureChar.processedText = 'name';
          typeCaptureChar.result = { name:'name',props:{}};
          expect(typeCaptureChar.process(' ')).toBe(ProcessResult.Continue);
        })
        it('should not allow { after result', () => {
          typeCaptureChar.processedText = 'name';
          typeCaptureChar.result = { name:'name',props:{}};
          expect(typeCaptureChar.process('{')).toBe(ProcessResult.Break);
        })
        it('should not allow * after result', () => {
          typeCaptureChar.processedText = 'name';
          typeCaptureChar.result = { name:'name',props:{}};
          expect(typeCaptureChar.process('*')).toBe(ProcessResult.Break);
        })
      })
      
    })
  })
  describe('should reset to initial state', () => {
    it(`should have name ''`, () => {
      typeCaptureChar.name ='name';
      typeCaptureChar.reset();
      expect(typeCaptureChar.name).toEqual('');
    })
    it(`should have ignoringNameWhitespace false ''`, () => {
      typeCaptureChar.ignoringNameWhitespace = true;
      typeCaptureChar.reset();
      expect(typeCaptureChar.ignoringNameWhitespace).toBe(false);
    })
    it('should have result undefined', () => {
      typeCaptureChar.result = { name:'name', props:{}};
      typeCaptureChar.reset();
      expect(typeCaptureChar.result).toBeUndefined();
    })
    it('should have stringToObjectParser undefined', () => {
      typeCaptureChar.stringToObjectParser = new StringToObjectParser();
      typeCaptureChar.reset();
      expect(typeCaptureChar.stringToObjectParser).toBeUndefined();
    })
  })
})