import { commentLinkInterceptorTargetBlank, commentLinkInterceptorTargetSelf} from '../../../src/interceptors/links/commentLinkInterceptor'
jest.mock('../../../src/interceptors/links/commentLinkInterceptorCreator', () => {
  return {
    createCommentLinkInterceptor:(matcher:any ) => matcher
  }
})
jest.mock('../../../src/interceptors/links/createMdLinkLinkMatcher', () => {
  return {
    createMdLinkLinkMatcher:jest.fn().mockImplementation((arg:string|undefined)=>{
      return arg;
    })
  }
})
describe('commentLinkInterceptors', () => {
  describe('commentLinkInterceptorTargetSelf', () => {
    it('should be a comment link interceptor with default mdLinkLinkMatcher', () => {
      expect(commentLinkInterceptorTargetSelf).toBe('_self');
    })
  })
  describe('commentLinkInterceptorTargetBlank', () => {
    it('should be a comment link interceptor with target _blank mdLinkLinkMatcher', () => {
      expect(commentLinkInterceptorTargetBlank).toBe('_blank');
    })
  })
})
