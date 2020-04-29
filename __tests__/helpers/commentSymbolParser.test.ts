import { CaptureChar, ProcessResult, commentSymbolParser } from "../../src/helpers/commentSymbolParser";


describe('commentSymbolParser', () => {
  it('should throw if no capture chars', () => {
    expect(()=>commentSymbolParser('comment')).toThrow();
  })
  describe('Processing - comment has matching captureChar and an additional character', () => {
    it('should call process on the matching captureChar with the next char', () => {
      const process =jest.fn().mockReturnValue(ProcessResult.Continue);
      commentSymbolParser('comment zx',{char:'z',processedText:'',process,getCompleted:()=>{}});
      expect(process).toHaveBeenCalledWith('x');
    })
    describe('ProcessResult', () => {
      it(`should call getCompleted and then reset and set processedText to '' when ProcessResult.Completed`, () => {
        const callOrder:string[]=[];
        const captureChar:CaptureChar = {
          char:'z',
          processedText:'abc',
          getCompleted:() => callOrder.push('getCompleted'),
          reset:() => callOrder.push('reset'),
          process:() => ProcessResult.Completed
        }
        commentSymbolParser('comment zx',captureChar);
        expect(callOrder).toEqual(['getCompleted','reset'])
        expect(captureChar.processedText).toEqual('');
      })
      
      function processingAndAppending(doneResult:ProcessResult.Break|ProcessResult.Completed){
        it(`should keep processing and appending to processedText until ${doneResult === ProcessResult.Break?'Break':'Completed'}`, () => {
          let processCount = 0;
          const processTexts:string[]=[];
          const captureChar:CaptureChar = {
            char:'z',
            processedText:'',
            getCompleted:()=>{},
            process:() => {
              processTexts.push(captureChar.processedText);
              if(processCount===3){
                return doneResult;
              }
              processCount++;
              return ProcessResult.Continue;
            }
          }
          commentSymbolParser('comment zabcd',captureChar);
          expect(processTexts).toEqual(['','a','ab','abc'])
        })
      }
      processingAndAppending(ProcessResult.Completed);
      processingAndAppending(ProcessResult.Break);
        
      describe('ProcessResult.Break', () => {
        it('should reset the captureChar and processedText', () => {
          const reset = jest.fn();
          let processCount = 0;
          const captureChar:CaptureChar = {
            char:'z',
            processedText:'',
            getCompleted:()=>{},
            process:() => {
              if(processCount===3){
                return ProcessResult.Completed
              }
              processCount++;
              return ProcessResult.Break;
            },
            reset
          }
          commentSymbolParser('comment zabcd   ',captureChar);
          expect(reset).toHaveBeenCalled();
          expect(captureChar.processedText).toEqual('');

        })
        it('should backtrack', () => {
          const breakingChar:CaptureChar = {
            char:'z',
            processedText:'',
            getCompleted:() => {},
            process:() => ProcessResult.Break
          }
          const backtrackedChar = {
            char:'*',
            processedText:'',
            getCompleted:() => {},
            process:jest.fn().mockReturnValue(ProcessResult.Break)
          }
          commentSymbolParser('comment z*x',breakingChar,backtrackedChar);
          expect(backtrackedChar.process).toHaveBeenCalledWith('x');
        })
      })
      
      it('should not append the character to processedText when ProcessResult.ContinueNoCapture', () => {
        let processCount = 0;
        const processTexts:string[]=[];
        const captureChar:CaptureChar = {
          char:'z',
          processedText:'',
          getCompleted:()=>{},
          process:() => {
            processTexts.push(captureChar.processedText);
            if(processCount===3){
              return ProcessResult.Completed
            }
            processCount++;
            return ProcessResult.ContinueNoCapture;
          }
        }
        commentSymbolParser('comment zabcd',captureChar);
        expect(processTexts).toEqual(['','','',''])
      })
    })

    it('should reset the capture char and processedText if it is capturing but not completed by the end of the comment', () => {
      const reset = jest.fn();
      const captureChar = {char:'z',processedText:'!',process:()=>ProcessResult.Continue,reset};
      commentSymbolParser('comment zxx',captureChar as any);
      expect(reset).toHaveBeenCalled();
      expect(captureChar.processedText).toEqual('');
    })
    it('should backtrack if it is capturing but not completed by the end of the comment', () =>{
      const notCompletedCaptureChar = {char:'z',processedText:'',process:()=>ProcessResult.Continue};
      const backtrackedProcess = jest.fn();
      const backtrackedCaptureChar = {char:'x',processedText:'',process:backtrackedProcess};
      commentSymbolParser('comment zxa',notCompletedCaptureChar as any,backtrackedCaptureChar as any);
      expect(backtrackedProcess).toHaveBeenCalledWith('a');
    })
  })
    
  describe('comment does not contain a capture char', () => {
    it('should not call process', () => {
      const process =jest.fn();
      commentSymbolParser('comment',{char:'z',processedText:'',process,getCompleted:()=>{}});
      expect(process).not.toHaveBeenCalled();
    })
    it('should only return a single comment', () => {
      const parsed = commentSymbolParser('comment',{char:'z',processedText:''} as any);
      expect(parsed.length).toBe(1);
      expect(parsed[0]).toEqual('comment');
    })
  })

  describe('comment does contain a capture char - parsed', () => {
    interface CommentSymbolParserResultTest{
      description:string,
      comment:string,
      captureChars:Array<CaptureChar<any>>
      expectedProcessed:Array<any>
    }
    class DemoCaptureChar implements CaptureChar<string>{
      constructor(readonly char:string,readonly breakChar?:string,readonly noCaptureChar?:string){}
      process: (char: string) => ProcessResult = (char) =>{
        if(char === this.char){
          return ProcessResult.Completed;
        }
        if(this.breakChar&&this.breakChar === char){
          return ProcessResult.Break;
        }
        if(this.noCaptureChar&&this.noCaptureChar===char){
          return ProcessResult.ContinueNoCapture
        }
        return ProcessResult.Continue;
      }
      getCompleted = () => {
        return this.processedText;
      }
      processedText = '';
      
    }
    const completingCaptureChar = new DemoCaptureChar('$');
    const breakingCaptureChar = new DemoCaptureChar('$','%');
    const endsWhilstCapturingCaptureChar = new DemoCaptureChar('$');
    const endsWhilstCapturingNoCaptureCaptureChar = new DemoCaptureChar('$',undefined,'|');
    const completingNoCaptureCaptureChar = new DemoCaptureChar('$',undefined,'|');
    const breakingForBacktrackingCaptureChar = new DemoCaptureChar('$','%');
    const backtrackedCaptureChar = new DemoCaptureChar('!');
    const breakingForBacktrackingNoCaptureCaptureChar = new DemoCaptureChar('$','%','|');
    const backtrackedCaptureChar2 = new DemoCaptureChar('|');
    const resusedCaptureChar = new DemoCaptureChar('$');
    const notCompletedCaptureChar = new DemoCaptureChar('$');
    const backtrackedCaptureChar3 = new DemoCaptureChar('|');
  
    const tests:CommentSymbolParserResultTest[] = [
      {
        description:'capture char - completes',
        captureChars:[completingCaptureChar],
        comment:'a comment $captured$ remaining',
        expectedProcessed:['a comment ','captured',' remaining']
      },
      {
        description:'capture char - breaks - no backtracking',
        captureChars:[breakingCaptureChar],
        comment:'a comment $breaks% remaining',
        expectedProcessed:['a comment $breaks% remaining']
      },
      {
        description:'capture char - no ContinueNoCapture end whilst capturing',
        captureChars:[endsWhilstCapturingCaptureChar],
        comment:'a comment $endswhilstcapturing',
        expectedProcessed:['a comment $endswhilstcapturing']
      },
      {
        description:'capture char - ContinueNoCapture end whilst capturing',
        captureChars:[endsWhilstCapturingNoCaptureCaptureChar],
        comment:'a comment $endswhilstcapturing|',
        expectedProcessed:['a comment $endswhilstcapturing|']
      },
      {
        description:'capture char ContinueNoCapture completes',
        captureChars:[completingNoCaptureCaptureChar],
        comment:'a comment $completes|$',
        expectedProcessed:['a comment ','completes']
      },
      {
        description:'backtracking no ContinueNoCapture',
        captureChars:[breakingForBacktrackingCaptureChar,backtrackedCaptureChar],
        comment:'a comment $ab!%123! remaining',
        expectedProcessed:['a comment $ab','%123',' remaining']
      },
      {
        description:'backtracking ContinueNoCapture',
        captureChars:[breakingForBacktrackingNoCaptureCaptureChar,backtrackedCaptureChar2],
        comment:'a comment $ab|%123| remaining',
        expectedProcessed:['a comment $ab','%123',' remaining']
      },
      {
        description: 'backtracking at the end',
        captureChars:[notCompletedCaptureChar,backtrackedCaptureChar3],
        comment:'a comment $ab|%123| remaining',
        expectedProcessed:['a comment $ab','%123',' remaining']
      },
      {
        description:'resusing capture char - processed text is reset',
        captureChars:[resusedCaptureChar],
        comment:'a comment $one$$two$$ab',
        expectedProcessed:['a comment ','one','two','$ab']
      }
    ];
  
    tests.forEach(test => {
      it(test.description, () => {
        const result = commentSymbolParser(test.comment,...test.captureChars);
        expect(result).toEqual(test.expectedProcessed);
      })
    })
  })
})
