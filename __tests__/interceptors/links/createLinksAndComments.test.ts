import { createLinksAndComments } from '../../../src/interceptors/links/createLinksAndComments';
import { ElementNode, TextNode } from 'react-syntax-highlighter-renderer-interceptor';
jest.mock('../../../src/common', () => {
  return {
    createCommentNode:(comment:string)=>comment + 'node'
  }
})
describe('createLinksAndComments', () => {
  it('should return an array with comment nodes for comments', () => {
    const linksAndComments = createLinksAndComments(['one','two']);
    expect(linksAndComments).toEqual(['onenode','twonode']);
  })
  it('should return an array with link nodes for links', () => {
    const linkProps = {
      linkProp:'link prop value'
    }
    const linkStyle = {color:'red'}
    function expectLinkText(linkNode:ElementNode,text:string){
      expect(linkNode.children[0].type).toBe('text');
      expect((linkNode.children[0] as TextNode).value).toBe(text)
    }
    function expectStyleAndPropsOnProperties(properties:ElementNode['properties']){
      expect(properties.style!.color).toBe('red');
      expect(properties.linkProp).toEqual(linkProps.linkProp);
    }
    function expectLinkNode(linkNode:ElementNode,text:string, tagName:string){
      expect(linkNode.type).toBe('element');
      const properties = linkNode.properties;
      expect(properties.className).toEqual(['link']);
      expect(properties.href).toEqual('https://www.bbc.com');
      expect(linkNode.tagName).toEqual(tagName);
      expectLinkText(linkNode, text);
      expectStyleAndPropsOnProperties(properties);
    }
    const linksAndComments = createLinksAndComments(
      [
        {
          url:'https://www.bbc.com',
          linkText:'the bbc', 
          linkType:'other', 
          linkProps,
          linkStyle:{color:'red'}
        },
        {
          url:'https://www.bbc.com',
          linkProps,
          linkStyle
        }
      ]
    )
    const linkNode = linksAndComments[0];
    expectLinkNode(linkNode,'the bbc', 'other');
    const linkNodeWithDefaults = linksAndComments[1]
    expectLinkNode(linkNodeWithDefaults, 'https://www.bbc.com', 'a');
  })
})