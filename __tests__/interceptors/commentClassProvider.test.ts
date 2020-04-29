import { createCommentNodeRenderInterceptor } from '../../src/helpers/commentHofs'
import { commentClassProvider} from '../../src/interceptors/commentClassProvider'
import { ElementNode, TextNode } from 'react-syntax-highlighter-renderer-interceptor'
jest.mock('../../src/helpers/commentHofs', () => {
  return {
    createCommentNodeRenderInterceptor:jest.fn().mockImplementation(nri => nri)
  }
})
describe('commentClassProvider', () => {
  it('should be a commentNodeRenderInterceptor', () => {
    expect(createCommentNodeRenderInterceptor).toHaveBeenCalled();
  })
  it('should add class names and remove from comment text', () => {
    const nodeRenderDetails = {
      node:{
        type:'element',
        properties:{
          className:['comment']
        },
        children:[
          {
            type:'text',
            value:'Some text {class=class1 class2} and some more'
          }
        ]
      }
    }
    const withClasses = commentClassProvider(nodeRenderDetails as any);
    const node = withClasses!.node as ElementNode;
    expect(node.properties.className).toEqual(['comment','class1','class2']);
    expect((node.children[0] as TextNode).value).toEqual('Some text  and some more')
  })
})