import { createNodeObjectPropertyAttacher} from '../../src/interceptors/nodeObjectPropertyAttacher';
import { ElementNode, NodeRenderDetails,RenderNode, TextNode } from 'react-syntax-highlighter-renderer-interceptor';
describe('nodeObjectPropertyAttacher', () => {
  const stylesheet = {
    'key':{
      color:'red'
    }
  }
  function getNodeRenderDetails(node:RenderNode,key=0,useInlineStyles=true):NodeRenderDetails{
    return {
      key:`code-segment-${key}`,
      node,
      useInlineStyles,
      stylesheet:{
        'key':{
          color:'red'
        }
      }
    }
  }
  describe('properties are attached', () => {
    function getNode():ElementNode{
      return {"type":"element","tagName":"span","properties":{"className":["token","comment"]},"children":[{"type":"text","value":"/*\n  ~[refStyle]{\n    \"color\": {\n      \"color\":\"red\"\n    },\n    \"fontsize\": {\n      \"fontSize\":\"125%\"\n    }\n  }\n*/"}]};
    }
    
    // See note in nodeObjectPropertyAttacher.ts
    /* describe('triple exclamation removal', () => {
      it('should change the comment value to !!!', () => {
        const objectPropertyAttacher = createNodeObjectPropertyAttacher();
        const nodeRenderDetails = getNodeRenderDetails(getNode());
        const intercepted = objectPropertyAttacher(nodeRenderDetails)!;
        expect(intercepted.key).toBe('code-segment-0');
        expect(intercepted.stylesheet).toEqual(stylesheet);
        expect(intercepted.useInlineStyles).toBe(true);
        const interceptedNode = intercepted.node as ElementNode;
        expect((interceptedNode.children[0] as TextNode).value).toBe('!!!');
      });
    }) */
    describe('not triple exclamation removal', ()=>{
      it('should return undefined', () => {
        const objectPropertyAttacher = createNodeObjectPropertyAttacher(/* false */);
        const nodeRenderDetails = getNodeRenderDetails(getNode());
        expect(objectPropertyAttacher(nodeRenderDetails)).toBeUndefined();
      })
    })
    
  })
  describe('properties are not attached', () => {
    describe('have already encountered properties', () => {
      it('should add these properties to the node', () => {
        const nodes:RenderNode[] = [{"type":"element","tagName":"span","properties":{"className":["token","comment"]},"children":[{"type":"text","value":"/*\n  ~[refStyle]{\n    \"color\": {\n      \"color\":\"red\"\n    },\n    \"fontsize\": {\n      \"fontSize\":\"125%\"\n    }\n  }\n*/"}]},{"type":"text","value":"\n"},{"type":"element","tagName":"span","properties":{"className":["token","comment"]},"children":[{"type":"text","value":"// another comment node"}]}];
        const objectPropertyAttacher = createNodeObjectPropertyAttacher();
        objectPropertyAttacher(getNodeRenderDetails(nodes[0],0));
        objectPropertyAttacher(getNodeRenderDetails(nodes[1],1));
        const intercepted = objectPropertyAttacher(getNodeRenderDetails(nodes[2],2))!;
        const node = intercepted.node as any;
        expect(node.refStyle).toEqual({
          "color": {
            "color":"red"
          },
          "fontsize": {
            "fontSize":"125%"
          }
        })
      })
    })
    describe('have not encountered properties', () => {
      it('should just return nodeRenderDetails', () => {
        const node:ElementNode = {"type":"element","tagName":"span","properties":{"className":["token","comment"]},"children":[{"type":"text","value":"// no object properties"}]};
        const nodeRenderDetails = getNodeRenderDetails(node);
        const objectPropertyAttacher = createNodeObjectPropertyAttacher();
        expect(objectPropertyAttacher(nodeRenderDetails)).toBe(nodeRenderDetails);
      })
    })
  })
  describe('parsing', () => {
    it('should not have whitespace between ~ and [', () => {
      const node:ElementNode = {"type":"element","tagName":"span","properties":{"className":["token","comment"]},"children":[{"type":"text","value":"/*\n  ~ [refStyle]{\n    \"color\": {\n      \"color\":\"red\"\n    },\n    \"fontsize\": {\n      \"fontSize\":\"125%\"\n    }\n  }\n*/"}]};
      const objectPropertyAttacher = createNodeObjectPropertyAttacher();
      const nodeRenderDetails = getNodeRenderDetails(node);
      expect(objectPropertyAttacher(nodeRenderDetails)).toBe(nodeRenderDetails);
    })
    it('requires a property name', () => {
      const node:ElementNode = {"type":"element","tagName":"span","properties":{"className":["token","comment"]},"children":[{"type":"text","value":"/*\n  ~[]{\n    \"color\": {\n      \"color\":\"red\"\n    },\n    \"fontsize\": {\n      \"fontSize\":\"125%\"\n    }\n  }\n*/"}]};
      const objectPropertyAttacher = createNodeObjectPropertyAttacher();
      const nodeRenderDetails = getNodeRenderDetails(node);
      expect(objectPropertyAttacher(nodeRenderDetails)).toBe(nodeRenderDetails);
    })
    it('will fail for non object property', () => {
      const node:ElementNode = {"type":"element","tagName":"span","properties":{"className":["token","comment"]},"children":[{"type":"text","value":"/*\n  ~[refStyle]malformed\n*/"}]};
      const objectPropertyAttacher = createNodeObjectPropertyAttacher();
      const nodeRenderDetails = getNodeRenderDetails(node);
      expect(objectPropertyAttacher(nodeRenderDetails)).toBe(nodeRenderDetails);
    })
    it('should ignore whitespace in []', () => {
      const nodes:RenderNode[] = [{"type":"element","tagName":"span","properties":{"className":["token","comment"]},"children":[{"type":"text","value":"/*\n  ~[ refStyle ]{\n    \"color\": {\n      \"color\":\"red\"\n    },\n    \"fontsize\": {\n      \"fontSize\":\"125%\"\n    }\n  }\n*/"}]},{"type":"text","value":"\n"},{"type":"element","tagName":"span","properties":{"className":["token","comment"]},"children":[{"type":"text","value":"// another comment node"}]}];
        const objectPropertyAttacher = createNodeObjectPropertyAttacher();
        objectPropertyAttacher(getNodeRenderDetails(nodes[0],0));
        objectPropertyAttacher(getNodeRenderDetails(nodes[1],1));
        const intercepted = objectPropertyAttacher(getNodeRenderDetails(nodes[2],2))!;
        const node = intercepted.node as any;
        expect(node.refStyle).toEqual({
          "color": {
            "color":"red"
          },
          "fontsize": {
            "fontSize":"125%"
          }
        })
    })
    it('should allow whitespace between ] {', () => {
      const nodes:RenderNode[] = [{"type":"element","tagName":"span","properties":{"className":["token","comment"]},"children":[{"type":"text","value":"/*\n  ~[refStyle] {\n    \"color\": {\n      \"color\":\"red\"\n    },\n    \"fontsize\": {\n      \"fontSize\":\"125%\"\n    }\n  }\n*/"}]},{"type":"text","value":"\n"},{"type":"element","tagName":"span","properties":{"className":["token","comment"]},"children":[{"type":"text","value":"// another comment node"}]}];
        const objectPropertyAttacher = createNodeObjectPropertyAttacher();
        objectPropertyAttacher(getNodeRenderDetails(nodes[0],0));
        objectPropertyAttacher(getNodeRenderDetails(nodes[1],1));
        const intercepted = objectPropertyAttacher(getNodeRenderDetails(nodes[2],2))!;
        const node = intercepted.node as any;
        expect(node.refStyle).toEqual({
          "color": {
            "color":"red"
          },
          "fontsize": {
            "fontSize":"125%"
          }
        })
    })
  })
})