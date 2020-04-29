import { ProcessResult } from '../../../src/helpers/commentSymbolParser';
import { angleBracketCaptureChar } from '../../../src/interceptors/links/angleBracketCaptureChar';
import { mdLinkCaptureChar } from '../../../src/interceptors/links/mdLinkCaptureChar';

describe('mdLinkCaptureChar', () => {
  afterEach(()=>{
    mdLinkCaptureChar.reset();
    mdLinkCaptureChar.processedText = '';
  });
  it('should have char [', () => {
    expect(mdLinkCaptureChar.char).toEqual('[');
  });
  it(`should have processedText ''`, () => {
    expect(mdLinkCaptureChar.processedText).toEqual('');
  })
  describe('process', () => {
    it('should break for [', () => {
      expect(mdLinkCaptureChar.process('[')).toEqual(ProcessResult.Break);
    })
    describe(']', () => {
      it('should break if no link text', () => {
        expect(mdLinkCaptureChar.process(']')).toEqual(ProcessResult.Break);
      })
      it('should continue if link text', () => {
        mdLinkCaptureChar.process('t');
        expect(mdLinkCaptureChar.process(']')).toEqual(ProcessResult.Continue);
      })
      it('should break if after ]', () => {
        mdLinkCaptureChar.process('t');
        mdLinkCaptureChar.process(']')
        expect(mdLinkCaptureChar.process(']')).toEqual(ProcessResult.Break);
      })
      it('should break if in url', () => {
        mdLinkCaptureChar.process('t');
        mdLinkCaptureChar.process(']')
        mdLinkCaptureChar.process('(')
        expect(mdLinkCaptureChar.process(']')).toEqual(ProcessResult.Break);
      })
    })
    describe('(', () => {
      it('should be allowed in link text', () => {
        expect(mdLinkCaptureChar.process('(')).toEqual(ProcessResult.Continue);
        expect(mdLinkCaptureChar.linkText).toEqual('(');
      })
      it('should be allowed to follow [ ]', () => {
        mdLinkCaptureChar.process('t');
        mdLinkCaptureChar.process(']');
        expect(mdLinkCaptureChar.process('(')).toEqual(ProcessResult.Continue);
      })
      it('should break if in url', () => {
        mdLinkCaptureChar.process('t');
        mdLinkCaptureChar.process(']');
        mdLinkCaptureChar.process('(');
        expect(mdLinkCaptureChar.process('(')).toEqual(ProcessResult.Break);
      })
    })
    describe(')', () => {
      it('should be allowed in link text', () => {
        expect(mdLinkCaptureChar.process(')')).toEqual(ProcessResult.Continue);
        expect(mdLinkCaptureChar.linkText).toEqual(')');
      })
      it('should break if follows [ ]', () => {
        mdLinkCaptureChar.process('t');
        mdLinkCaptureChar.process(']');
        expect(mdLinkCaptureChar.process(')')).toEqual(ProcessResult.Break);
      })
      describe('closing', () => {
        it('should break if no url', () => {
          mdLinkCaptureChar.process('t');
          mdLinkCaptureChar.process(']');
          mdLinkCaptureChar.process('(');
          expect(mdLinkCaptureChar.process(')')).toEqual(ProcessResult.Break);
        })
        it('should complete if url', () => {
          mdLinkCaptureChar.process('t');
          mdLinkCaptureChar.process(']');
          mdLinkCaptureChar.process('(');
          mdLinkCaptureChar.process('u');
          expect(mdLinkCaptureChar.process(')')).toEqual(ProcessResult.Completed);
        })
      })
    })
    describe('other chars', () => {
      it('should continue and add to title when [', () => {
        expect(mdLinkCaptureChar.process('t')).toEqual(ProcessResult.Continue);
        expect(mdLinkCaptureChar.linkText).toEqual('t');
      })
      it('should break when []', () => {
        mdLinkCaptureChar.process('t');
        mdLinkCaptureChar.process(']');
        expect(mdLinkCaptureChar.process(' ')).toEqual(ProcessResult.Break);
      })
      it('should continue and add to url when [ ](', () => {
        mdLinkCaptureChar.process('t');
        mdLinkCaptureChar.process(']');
        mdLinkCaptureChar.process('(');
        expect(mdLinkCaptureChar.process('u')).toEqual(ProcessResult.Continue);
        expect(mdLinkCaptureChar.url).toEqual('u');
      })
    })
  })
  describe('getCompleted', () => {
    it('should return url and linkText', () => {
      mdLinkCaptureChar.url='https://www.bbc.com';
      mdLinkCaptureChar.linkText = 'the bbc';
      expect(mdLinkCaptureChar.getCompleted()).toEqual({url:mdLinkCaptureChar.url, linkText:mdLinkCaptureChar.linkText});
    })
  })
  describe('reset', () => {
    it('should reset linkText and url', () =>{
      mdLinkCaptureChar.url='https://www.bbc.com';
      mdLinkCaptureChar.linkText = 'the bbc';
      mdLinkCaptureChar.reset();
      expect(mdLinkCaptureChar.url).toEqual('');
      expect(mdLinkCaptureChar.linkText).toEqual('');
    })
  })
})

describe('angleBracketCaptureChar', () => {
  afterEach(()=>{
    angleBracketCaptureChar.processedText = ''
  });
  it(`should have processedText ''`, () =>{
    expect(angleBracketCaptureChar.processedText).toEqual('');
  })
  it('should have char <', () => {
    expect(angleBracketCaptureChar.char).toEqual('<');
  })
  
  it('should break for whitespace', () => {
    expect(angleBracketCaptureChar.process(' ')).toEqual(ProcessResult.Break);
  })
  it('should break for whitespace - newline', () => {
    expect(angleBracketCaptureChar.process('\n')).toEqual(ProcessResult.Break);
  })
  it('should break for <', () => {
    expect(angleBracketCaptureChar.process('<')).toEqual(ProcessResult.Break);
  })
  describe('closing with >', () => {
    it('should break if no processedText', () => {
      expect(angleBracketCaptureChar.process('>')).toEqual(ProcessResult.Break);
    })
    it('should complete if has processedText', () => {
      angleBracketCaptureChar.processedText='a'
      expect(angleBracketCaptureChar.process('>')).toEqual(ProcessResult.Completed);
    })
  })
  it('should continue for non whitespace other than <>', () => {
    expect(angleBracketCaptureChar.process('a')).toEqual(ProcessResult.Continue);
  })
  it('should return url processedText from getCompleted', () => {
    angleBracketCaptureChar.processedText='a';
    expect(angleBracketCaptureChar.getCompleted()).toEqual({url:'a'});
  })
})
