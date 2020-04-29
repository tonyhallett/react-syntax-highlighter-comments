import { createCommentLinkInterceptor} from '../../../src/interceptors/links/commentLinkInterceptorCreator'
import { NodeRenderDetails, ElementNode } from 'react-syntax-highlighter-renderer-interceptor';
import { createLinksAndComments } from '../../../src/interceptors/links/createLinksAndComments';
const mockCreatedLinksAndComments:any = [];
jest.mock('../../../src/interceptors/links/createLinksAndComments', () => {
  return {
    createLinksAndComments:jest.fn().mockImplementation(()=>mockCreatedLinksAndComments)
  }
})
describe('createCommentLinkInterceptor', () => {
  beforeEach(()=> {
    jest.clearAllMocks();
  })
  it('should not call the matcher for non comment nodes', () => {
    const matcher = jest.fn();
    const commentLinkInterceptor = createCommentLinkInterceptor(matcher);
    const nodeRenderDetails: NodeRenderDetails = {key:'',stylesheet:{}, useInlineStyles:false, node: {children:[],properties:{className:[]},type:'element',tagName:'span'}}
    expect(matcher).not.toHaveBeenCalled();
    expect(commentLinkInterceptor(nodeRenderDetails)).toBe(nodeRenderDetails);
  });
  it('should call the matcher with the comment', () => {
    const matcher = jest.fn();
    const commentLinkInterceptor = createCommentLinkInterceptor(matcher);
    const nodeRenderDetails: NodeRenderDetails = {key:'',stylesheet:{}, useInlineStyles:false, node: {children:[{type:'text',value:'a comment'}],properties:{className:['comment']},type:'element',tagName:'span'}}
    commentLinkInterceptor(nodeRenderDetails);
    expect(matcher).toHaveBeenCalledWith('a comment');
  })
  it('should return the original render details when matcher does not match', () => {
    const matcher = jest.fn();
    const commentLinkInterceptor = createCommentLinkInterceptor(matcher);
    const nodeRenderDetails: NodeRenderDetails = {key:'',stylesheet:undefined as any, useInlineStyles:false, node: {children:[{type:'text',value:'a comment'}],properties:{className:['comment']},type:'element',tagName:'span'}}
    expect(commentLinkInterceptor(nodeRenderDetails)).toBe(nodeRenderDetails);
  })
  describe('matcher matches', () => {
    it('should only change the node property', () => {
      const matcher = jest.fn().mockReturnValue([]);
      const commentLinkInterceptor = createCommentLinkInterceptor(matcher);
      const nodeRenderDetails: NodeRenderDetails = {
        key:'123',
        stylesheet:{'class1':{color:'red'}}, 
        useInlineStyles:false, 
        node: {
          children:[{type:'text',value:'a comment'}],
          properties:{className:['comment']},type:'element',tagName:'span'
        }
      }
      const intercepted = commentLinkInterceptor(nodeRenderDetails)!;
      expect(intercepted.key).toEqual('123');
      expect(intercepted.stylesheet).toBe(nodeRenderDetails.stylesheet);
      expect(nodeRenderDetails.useInlineStyles).toBe(false)
    })
    describe('new node', () => {
      it('should have type element and tagName span', () => {
        const matcherResults = [''];
        const matcher = jest.fn().mockReturnValue(matcherResults);
        const commentLinkInterceptor = createCommentLinkInterceptor(matcher);
        const nodeRenderDetails: NodeRenderDetails = {
          key:'',
          stylesheet:{}, 
          useInlineStyles:false, 
          node: {
            children:[{type:'text',value:'a comment'}],
            properties:{className:['comment']},type:'element',tagName:'span'
          }
        }
        const intercepted = commentLinkInterceptor(nodeRenderDetails)!;
        const newNode = intercepted.node as ElementNode;
        expect(newNode.type).toBe('element');
        expect(newNode.tagName).toBe('span');
      })
      it('should only have className properties from before but without comment', () => {
        const matcherResults = [''];
        const matcher = jest.fn().mockReturnValue(matcherResults);
        const commentLinkInterceptor = createCommentLinkInterceptor(matcher);
        const nodeRenderDetails: NodeRenderDetails = {
          key:'',
          stylesheet:{}, 
          useInlineStyles:false, 
          node: {
            children:[{type:'text',value:'a comment'}],
            properties:{className:['comment','other']},type:'element',tagName:'span'
          }
        }
        const intercepted = commentLinkInterceptor(nodeRenderDetails)!;
        const newNode = intercepted.node as ElementNode;
        expect(Object.getOwnPropertyNames(newNode.properties).length).toBe(1);
        expect(newNode.properties.className).toEqual(['other']);
      })
      it('should create links and comments with the matcher results', () => {
        const matcherResults = [''];
        const matcher = jest.fn().mockReturnValue(matcherResults);
        const commentLinkInterceptor = createCommentLinkInterceptor(matcher);
        const nodeRenderDetails: NodeRenderDetails = {
          key:'',
          stylesheet:{}, 
          useInlineStyles:false, 
          node: {
            children:[{type:'text',value:'a comment'}],
            properties:{className:['comment']},type:'element',tagName:'span'
          }
        }
        const intercepted = commentLinkInterceptor(nodeRenderDetails)!;
        expect((intercepted.node as ElementNode).children).toBe(mockCreatedLinksAndComments);
        expect((createLinksAndComments as jest.Mock).mock.calls[0][0]).toBe(matcherResults);
      })
    })
  })
})