import {mdLinkCaptureChar} from '../../../src/interceptors/links/mdLinkCaptureChar'
import {angleBracketCaptureChar} from '../../../src/interceptors/links/angleBracketCaptureChar'
import { commentSymbolParser} from '../../../src/helpers/commentSymbolParser'
import {createMdLinkLinkMatcher, LinkTarget} from '../../../src/interceptors/links/createMdLinkLinkMatcher'
import { MdLink } from '../../../src/interceptors/links/mdLink';
jest.mock('../../../src/helpers/commentSymbolParser');

describe('createMdLinkLinkMatcher', () => {
  const mockedCommentSymbolParser = commentSymbolParser as jest.Mock;
  let mockParsed:Array<string|MdLink>
  mockedCommentSymbolParser.mockImplementation(()=>mockParsed);
  beforeEach(()=>{
    mockedCommentSymbolParser.mockClear();
  })
  interface Targets{
    target:LinkTarget
  }
  const targets:LinkTarget[] = ['_self','_top','_blank','_parent'];
  targets.forEach(target =>{
    describe(`target - ${target}`, () => {
      it('should use the commentSymbolMatcher with mdLinkCaptureChar and angleBracketCaptureChar', () => {
        mockParsed = [];
        createMdLinkLinkMatcher(target)('a comment');
        expect(mockedCommentSymbolParser).toHaveBeenCalledWith('a comment', mdLinkCaptureChar,angleBracketCaptureChar);
      });
      it('should not change the nodeRenderDetails if no link', () => {
        mockParsed = ['a comment'];
        expect(createMdLinkLinkMatcher(target)('a comment')).toBeUndefined();
      })
      it('should return the parsed if contains a link, adding the target to linkProps', () => {
        mockParsed = ['a comment ', {url:'url'}];
        const result = createMdLinkLinkMatcher(target)('a comment')
        expect(result).toBe(mockParsed);
        expect(mockParsed[1]).toEqual({url:'url', linkProps:{target}})
      })
    })
  })
})