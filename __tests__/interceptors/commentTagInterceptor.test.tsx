import {createCommentTagInterceptor, PropsPrecedence} from '../../src/interceptors/commentTagInterceptor/interceptor';
import { RenderNode, NodeRenderDetails, ElementNode } from 'react-syntax-highlighter-renderer-interceptor';
import * as React from "react";

export const RSHDemoComment:React.FC<{display?:boolean,comment?:string}> = ({display, comment})=>{
  if(display){
    return <span>{comment?comment:'This is a demo comment'}</span>
  }
  return null;
}

function getCommentTagInterceptor(respectStyleProp?:boolean){
  return createCommentTagInterceptor(tagName => {
    if(tagName==='RSHDemoComment'){
      return RSHDemoComment;
    }
  },respectStyleProp)
}
const stylesheet= {
  comment:{
    color:'red'
  },
  other:{
    color:'blue'
  }
}
function getNodeRenderDetails(node:RenderNode,key=0,useInlineStyles=true){
  const nodeRenderDetails:NodeRenderDetails={
    key:`code-segment-${key}`,
    node,
    stylesheet,
    useInlineStyles
  }
  return nodeRenderDetails
}
describe('commentTagInterceptor', () => {
  
  const firstChildIsNotATag:ElementNode={
    type:'element',
    tagName:'span',
    properties:{className:['token','tag']},
    children:[{"type":"text","value":""}]
  }
  const unexpectedNameIdentifyingElement:ElementNode = {
    type:'element',
    tagName:'span',
    properties:{className:['token','tag']},
    children:[
      {
        type:'element',
        properties:{className:['token','tag']},
        tagName:'span',
        children:[
          {
            type:'text',
            value:'not a fragment'
          },
          {
            type:'element',
            properties:{className:['random']},
            tagName:'span',
            children:[
              
            ]
          }
        ]
    }]
  }
  const firstPunctuationNodeIsAbsent:ElementNode = {
    "type":"element",
    "tagName":"span",
    "properties":{"className":["token","tag"]},
    "children":[
      {
        "type":"element",
        "tagName":"span",
        "properties":{"className":["token","tag"]},
        "children":[
          {
            "type":"element",
            "tagName":"span",
            "properties":{"className":["token","not-punctuation"]},
            "children":[{"type":"text","value":"<"}]},{"type":"text","value":"span"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
  
  const secondPunctuationNodeIsAbsent:ElementNode = {
    "type":"element",
    "tagName":"span",
    "properties":{"className":["token","tag"]},
    "children":[
      {
        "type":"element",
        "tagName":"span",
        "properties":{"className":["token","tag"]},
        "children":[
          {
            "type":"element",
            "tagName":"span",
            "properties":{"className":["token","punctuation"]},
            "children":[{"type":"text","value":"<"}]
          },
          {
            "type":"text","value":"span"}
        ]
      },
      {
        "type":"element",
        "tagName":"span",
        "properties":{"className":["token","not-punctuation"]},"children":[{"type":"text","value":"/>"}]}]};

  const unexpectedClassNameForAttributes:ElementNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"text","value":"span"}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","not-attr-name"]},"children":[{"type":"text","value":"myatt"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
  const attributeValueWithoutAttributeName:ElementNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"text","value":"span"}]},{"type":"text","value":" "},
  {"type":"element","tagName":"span","properties":{"className":["token","attr-value"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"'"}]},{"type":"text","value":"attvalue"},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"'"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
  
  const incorrectAttributeValueKeyword:ElementNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"text","value":"span"}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"myatt"}]},{"type":"element","tagName":"span","properties":{"className":["token","script","language-javascript"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","script-punctuation","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"{"}]},{"type":"element","tagName":"span","properties":{"className":["token","boolean"]},"children":[{"type":"text","value":"fals"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"}"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
  const malformedAttributeValueArray:ElementNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"text","value":"span"}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"myatt"}]},{"type":"element","tagName":"span","properties":{"className":["token","script","language-javascript"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","script-punctuation","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"{"}]},{"type":"element","tagName":"span","properties":{"className":["token","boolean"]},"children":[{"type":"text","value":"[fals,true]"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"}"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
  const malformedAttributeValueObject:ElementNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"text","value":"span"}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"myatt"}]},{"type":"element","tagName":"span","properties":{"className":["token","script","language-javascript"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","script-punctuation","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"{"}]},{"type":"element","tagName":"span","properties":{"className":["token","boolean"]},"children":[{"type":"text","value":"{prop1:tru}"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"}"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
  const incompleteAttributeValueObject:ElementNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"text","value":"span"}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"myatt"}]},{"type":"element","tagName":"span","properties":{"className":["token","script","language-javascript"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","script-punctuation","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"{"}]},{"type":"element","tagName":"span","properties":{"className":["token","boolean"]},"children":[{"type":"text","value":"{prop1:tru"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"}"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
  const incorrectFormatAttributeValueString:ElementNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"text","value":"span"}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"myatt"}]},{"type":"element","tagName":"span","properties":{"className":["token","attr-value"]},"children":[]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}
  ]};
  
  function expectIgnores(node:RenderNode){
    const tagInterceptor = getCommentTagInterceptor();
    const nodeRenderDetails = getNodeRenderDetails(node);
    const intercepted = tagInterceptor(nodeRenderDetails);
    expect(intercepted).toBe(nodeRenderDetails);
  }

  describe('tag node', () => {
    //todo bail tests when has a stack

    describe('tag node incorrect format', () => {
      describe('first child is not tag', () => {
        it('should ignore when no stack', () => {
          expectIgnores(firstChildIsNotATag);
        })
      })
      describe('unexpected name identifying element', () => {
        it('should ignore when no stack', () => {
          expectIgnores(unexpectedNameIdentifyingElement);
        })
      })
      describe('first punctuation node is absent', () => {
        it('should ignore when no stack', () => {
          expectIgnores(firstPunctuationNodeIsAbsent);
        })
      })
      describe('non end tag, second punctuation tag is absent', () => {
        it('should ignore when no stack', () => {
          expectIgnores(secondPunctuationNodeIsAbsent);
        })
      });
      describe('incorrect format of attributes', () => {
        describe('unexpected class name', () => {
          it('should ignore when no stack', () => {
            expectIgnores(unexpectedClassNameForAttributes);
          })
        });
        describe('attribute value without attribute name', () => {
          it('should ignore when no stack', () => {
            expectIgnores(attributeValueWithoutAttributeName);
          })
        });
        describe('incorrect format string attribute value - not 3 or 4 children', () => {
          it('should ignore when no stack', () => {
            expectIgnores(incorrectFormatAttributeValueString);
          })
        });
        describe('incorrect curly value', () => {
          describe('incorrect keyword', () => {
            it('should ignore when no stack', () => {
              expectIgnores(incorrectAttributeValueKeyword);
            })
          })
          describe('malformed array', () => {
            it('should ignore when no stack', () => {
              expectIgnores(malformedAttributeValueArray);
            })
          })
          
          describe('malformed object', () => {
            it('should ignore when no stack', () => {
              expectIgnores(malformedAttributeValueObject);
            })
          })
          describe('incomplete object', () => {
            it('should ignore when no stack', () => {
              expectIgnores(incompleteAttributeValueObject);
            })
          })
  
        })
      })
  
    })
    
    describe('unknown component type', () => {
      it('should ignore when no stack', () => {
        expectIgnores({"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"Unknown"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]});
      })
    })

    
    function getSelfClosingDemoComponentNodeNoAttributes(){
      const node:RenderNode ={
        "type":"element",
        "tagName":"span",
        "properties":{
          "className":["token","tag"]
        },
        "children":[
          {
            "type":"element",
            "tagName":"span",
            "properties":{
              "className":["token","tag"]
            },
            "children":[
              {
                "type":"element",
                "tagName":"span",
                "properties":{"className":["token","punctuation"]},
                "children":[
                  {"type":"text","value":"<"}
                ]
              },
              {
                "type":"element",
                "tagName":"span",
                "properties":{
                  "className":["token","class-name"]
                },
                "children":[{"type":"text","value":"RSHDemoComment"}]
              }
            ]
          },
          {
            "type":"element",
            "tagName":"span",
            "properties":{
              "className":["token","punctuation"]
            },
            "children":[{"type":"text","value":"/>"}]
          }
        ]
      };
      return node;
    }
    function interceptNoAttribute(useInlineStyles=true){
      const tagInterceptor = getCommentTagInterceptor();
      const node= getSelfClosingDemoComponentNodeNoAttributes();
      return tagInterceptor(getNodeRenderDetails(node,0,useInlineStyles));
    }
    describe('self closing', () => {
      describe('no attribute', () => {
        

        it('should change the node tagName', () => {
          const intercepted = interceptNoAttribute();
          const interceptedNode = intercepted!.node as ElementNode
          expect(interceptedNode.type).toBe('element');
          expect(interceptedNode.tagName).toBe(RSHDemoComment);
        });

        
        
      })
      describe('props', () => {
        describe('boolean true - no value', () => {
          it('should have the prop as true', () => {
            const tagInterceptor = getCommentTagInterceptor();
            const node:RenderNode = {
              "type":"element",
              "tagName":"span",
              "properties":{"className":["token","tag"]},
              "children":[
                {
                  "type":"element",
                  "tagName":"span",
                  "properties":
                    {"className":["token","tag"]
                  },
                  "children":[
                    {
                      "type":"element",
                      "tagName":"span",
                      "properties":{"className":["token","punctuation"]},
                      "children":[{"type":"text","value":"<"}]
                    },
                    {
                      "type":"element",
                      "tagName":"span",
                      "properties":{"className":["token","class-name"]},
                      "children":[
                        {"type":"text","value":"RSHDemoComment"}
                      ]
                    }
                  ]
                },
                {
                  "type":"text",
                  "value":" "
                },
                {
                  "type":"element",
                  "tagName":"span",
                  "properties":{"className":["token","attr-name"]},
                  "children":[
                    {
                      "type":"text","value":"boolProp"
                    }
                  ]
                },
                {
                  "type":"element",
                  "tagName":"span",
                  "properties":{"className":["token","punctuation"]},
                  "children":[{"type":"text","value":"/>"}]
                }
              ]
            }
            const intercepted = tagInterceptor(getNodeRenderDetails(node));
            const interceptedNode = intercepted!.node as ElementNode
            expect(interceptedNode.type).toBe('element');
            expect(interceptedNode.tagName).toBe(RSHDemoComment);
            expect(interceptedNode.properties.commentDisplay).toBe(true);
            expect(interceptedNode.properties.boolProp).toBe(true);
          })
          it('should work with multiple', () => {
            const node:RenderNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"bool1Prop"}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"bool2Prop"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
            const tagInterceptor = getCommentTagInterceptor();
            const intercepted = tagInterceptor(getNodeRenderDetails(node));
            const interceptedNode = intercepted!.node as ElementNode
            expect(interceptedNode.properties.bool1Prop).toBe(true);
            expect(interceptedNode.properties.bool2Prop).toBe(true);
          })
        });
  
        describe('string prop', () => {
          it('should have the prop in properties', () => {
            const tagInterceptor = getCommentTagInterceptor();
            const node:RenderNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"stringProp"}]},{"type":"element","tagName":"span","properties":{"className":["token","attr-value"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"\""}]},{"type":"text","value":"string value"},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"\""}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
  
            const intercepted = tagInterceptor(getNodeRenderDetails(node));
            const interceptedNode = intercepted!.node as ElementNode
            expect(interceptedNode.type).toBe('element');
            expect(interceptedNode.tagName).toBe(RSHDemoComment);
            expect(interceptedNode.properties.commentDisplay).toBe(true);
            expect(interceptedNode.properties.stringProp).toBe('string value');
          });
  
          it('should work with empty string', () => {
            const tagInterceptor = getCommentTagInterceptor();
            const node:RenderNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"emptyStringProp"}]},{"type":"element","tagName":"span","properties":{"className":["token","attr-value"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"'"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"'"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
  
            const intercepted = tagInterceptor(getNodeRenderDetails(node));
            const interceptedNode = intercepted!.node as ElementNode
            expect(interceptedNode.properties.emptyStringProp).toBe('');
          })
        })
  
        describe(`"object" attributes`, () => {
          describe('true', () => {
            it('should have the prop in properties', () => {
              const tagInterceptor = getCommentTagInterceptor();
              const node:RenderNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"trueProp"}]},{"type":"element","tagName":"span","properties":{"className":["token","script","language-javascript"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","script-punctuation","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"{"}]},{"type":"element","tagName":"span","properties":{"className":["token","boolean"]},"children":[{"type":"text","value":"true"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"}"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
              
              const intercepted = tagInterceptor(getNodeRenderDetails(node));
              const interceptedNode = intercepted!.node as ElementNode
              expect(interceptedNode.type).toBe('element');
              expect(interceptedNode.tagName).toBe(RSHDemoComment);
              expect(interceptedNode.properties.commentDisplay).toBe(true);
              expect(interceptedNode.properties.trueProp).toBe(true);
            })
          });
          describe('false', () => {
            it('should have the prop in properties', () => {
              const tagInterceptor = getCommentTagInterceptor();
              const node:RenderNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"falseProp"}]},{"type":"element","tagName":"span","properties":{"className":["token","script","language-javascript"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","script-punctuation","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"{"}]},{"type":"element","tagName":"span","properties":{"className":["token","boolean"]},"children":[{"type":"text","value":"false"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"}"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
              
              const intercepted = tagInterceptor(getNodeRenderDetails(node));
              const interceptedNode = intercepted!.node as ElementNode
              expect(interceptedNode.type).toBe('element');
              expect(interceptedNode.tagName).toBe(RSHDemoComment);
              expect(interceptedNode.properties.commentDisplay).toBe(true);
              expect(interceptedNode.properties.falseProp).toBe(false);
            })
            
          })
          describe('null', () => {
            it('should have the prop in properties', () => {
              const tagInterceptor = getCommentTagInterceptor();
              const node:RenderNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"nullProp"}]},{"type":"element","tagName":"span","properties":{"className":["token","script","language-javascript"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","script-punctuation","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"{"}]},{"type":"element","tagName":"span","properties":{"className":["token","keyword"]},"children":[{"type":"text","value":"null"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"}"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
              
              const intercepted = tagInterceptor(getNodeRenderDetails(node));
              const interceptedNode = intercepted!.node as ElementNode
              expect(interceptedNode.type).toBe('element');
              expect(interceptedNode.tagName).toBe(RSHDemoComment);
              expect(interceptedNode.properties.commentDisplay).toBe(true);
              expect(interceptedNode.properties.nullProp).toBeNull();
            })
          })
          describe('undefined', () => {
            it('should have the prop in properties', () => {
              const tagInterceptor = getCommentTagInterceptor();
              const node:RenderNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"undefinedProp"}]},{"type":"element","tagName":"span","properties":{"className":["token","script","language-javascript"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","script-punctuation","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"{"}]},{"type":"text","value":"undefined"},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"}"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
              
              const intercepted = tagInterceptor(getNodeRenderDetails(node));
              const interceptedNode = intercepted!.node as ElementNode
              expect(interceptedNode.type).toBe('element');
              expect(interceptedNode.tagName).toBe(RSHDemoComment);
              expect(interceptedNode.properties.commentDisplay).toBe(true);
              expect(interceptedNode.properties.undefinedProp).toBeUndefined();
            })
          });
          describe('array', () => {
            it('should have the prop in properties', () => {
              const tagInterceptor = getCommentTagInterceptor();
              const node:RenderNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"arrayProp"}]},{"type":"element","tagName":"span","properties":{"className":["token","script","language-javascript"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","script-punctuation","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"{"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"["}]},{"type":"element","tagName":"span","properties":{"className":["token","string"]},"children":[{"type":"text","value":"'one'"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":","}]},{"type":"element","tagName":"span","properties":{"className":["token","number"]},"children":[{"type":"text","value":"2"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"]"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"}"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
              
              const intercepted = tagInterceptor(getNodeRenderDetails(node));
              const interceptedNode = intercepted!.node as ElementNode
              expect(interceptedNode.type).toBe('element');
              expect(interceptedNode.tagName).toBe(RSHDemoComment);
              expect(interceptedNode.properties.commentDisplay).toBe(true);
              expect(interceptedNode.properties.arrayProp).toEqual(['one',2]);
            })
          })
          describe('object', () => {
            it('should have the prop in properties', () => {
              const tagInterceptor = getCommentTagInterceptor();
              const node:RenderNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"objectProp"}]},{"type":"element","tagName":"span","properties":{"className":["token","script","language-javascript"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","script-punctuation","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"{"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"{"}]},{"type":"text","value":"prop1"},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":":"}]},{"type":"element","tagName":"span","properties":{"className":["token","string"]},"children":[{"type":"text","value":"'One'"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":","}]},{"type":"text","value":"prop2"},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":":"}]},{"type":"element","tagName":"span","properties":{"className":["token","number"]},"children":[{"type":"text","value":"2"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"}"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"}"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
              
              const intercepted = tagInterceptor(getNodeRenderDetails(node));
              const interceptedNode = intercepted!.node as ElementNode
              expect(interceptedNode.type).toBe('element');
              expect(interceptedNode.tagName).toBe(RSHDemoComment);
              expect(interceptedNode.properties.commentDisplay).toBe(true);
              expect(interceptedNode.properties.objectProp).toEqual({prop1:'One',prop2:2});
            })
          })
          describe('number', () => {
            interface NumberTest{
              nodeNumber:string,
              number:number
            }
            const tests:NumberTest[] = [
              {nodeNumber:'0.1', number:0.1},
              {nodeNumber:'0.0', number:0},
              {nodeNumber:'0', number:0}
            ]
            tests.forEach(test => it(`should have the prop in properties - ${test.nodeNumber}`, () => {
              const tagInterceptor = getCommentTagInterceptor();
              const node:RenderNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"numberProp"}]},{"type":"element","tagName":"span","properties":{"className":["token","script","language-javascript"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","script-punctuation","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"{"}]},{"type":"element","tagName":"span","properties":{"className":["token","number"]},"children":[{"type":"text","value":test.nodeNumber}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"}"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
              
              const intercepted = tagInterceptor(getNodeRenderDetails(node));
              const interceptedNode = intercepted!.node as ElementNode
              expect(interceptedNode.type).toBe('element');
              expect(interceptedNode.tagName).toBe(RSHDemoComment);
              expect(interceptedNode.properties.commentDisplay).toBe(true);
              expect(interceptedNode.properties.numberProp).toEqual(test.number);
            }))
          })
        })

      })
  
      it('should ignore html tags when not children', () => {
        const htmlTagNode:RenderNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"text","value":"img"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
        const tagInterceptor = getCommentTagInterceptor();
        const nodeRenderDetails = getNodeRenderDetails(htmlTagNode);
        const intercepted = tagInterceptor(nodeRenderDetails);
        expect(intercepted).toBe(nodeRenderDetails);
      })
    })

    function renderTagContainingImage(){
      const nodes:RenderNode[]=[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"text","value":"img"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]}];
      const tagInterceptor = getCommentTagInterceptor();
      tagInterceptor(getNodeRenderDetails(nodes[0]));
      tagInterceptor(getNodeRenderDetails(nodes[1],1));
      return tagInterceptor(getNodeRenderDetails(nodes[2],2));
    }
    describe('non self closing', () => {
      describe('no children', () => {
        const tagInterceptor = getCommentTagInterceptor();
        let noChildrenNodes:RenderNode[]=[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]}]
        it('should return undefined for first call', () => {
          const intercepted = tagInterceptor(getNodeRenderDetails(noChildrenNodes[0]));
          expect(intercepted).toBeUndefined();
        })
        it('should return the same as self closing for second call', () => {
          const intercepted = tagInterceptor(getNodeRenderDetails(noChildrenNodes[1],1));
          const interceptedNode = intercepted!.node as ElementNode;
          expect(interceptedNode.type).toBe('element');
          expect(interceptedNode.tagName).toBe(RSHDemoComment);
          expect(interceptedNode.properties.commentDisplay).toBe(true);
          expect(interceptedNode.properties.children).toBeUndefined();
        })
      })
      describe('children text', () => {
        const tagInterceptor = getCommentTagInterceptor();
        const childrenTextNodes:RenderNode[] = [{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","plain-text"]},"children":[{"type":"text","value":"Some text"}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]}];
        it('should return undefined for first call', () => {
          const intercepted = tagInterceptor(getNodeRenderDetails(childrenTextNodes[0]));
          expect(intercepted).toBeUndefined();
        })
        it('should return undefined for second call', () => {
          const intercepted = tagInterceptor(getNodeRenderDetails(childrenTextNodes[1],1));
          expect(intercepted).toBeUndefined();
        })
        it('should provide the text as children', () => {
          const intercepted = tagInterceptor(getNodeRenderDetails(childrenTextNodes[2],2));
          const interceptedNode = intercepted!.node as ElementNode;
          expect(interceptedNode.type).toBe('element');
          expect(interceptedNode.tagName).toBe(RSHDemoComment);
          expect(interceptedNode.properties.commentDisplay).toBe(true);
          expect(interceptedNode.properties.children).toBe('Some text');
        })
      })
      describe('children components', () => {
        const tagInterceptor = getCommentTagInterceptor();
        const childrenComponentNodes:RenderNode[] = [{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"parent"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"child1"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"child2"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]}];
        it('should return undefined for first call', () => {
          const intercepted = tagInterceptor(getNodeRenderDetails(childrenComponentNodes[0]));
          expect(intercepted).toBeUndefined();
        })
        it('should return undefined for second call', () => {
          const intercepted = tagInterceptor(getNodeRenderDetails(childrenComponentNodes[1],1));
          expect(intercepted).toBeUndefined();
        })
        it('should return undefined for third call', () => {
          const intercepted = tagInterceptor(getNodeRenderDetails(childrenComponentNodes[2],2));
          expect(intercepted).toBeUndefined();
        })
        it('should have the children components', () => {
          const intercepted = tagInterceptor(getNodeRenderDetails(childrenComponentNodes[3],3));
          const interceptedNode = intercepted!.node as ElementNode;
          expect(interceptedNode.type).toBe('element');
          expect(interceptedNode.tagName).toBe(RSHDemoComment);
          expect(interceptedNode.properties.commentDisplay).toBe(true);
          expect(interceptedNode.properties.parent).toBe(true);
  
          //use children instead of properties.children as need the recursive creation
          const childNodes = interceptedNode.children;
          expect(childNodes.length).toBe(2);
          childNodes.forEach(cn=>{
            const childElementNode = cn as ElementNode;
            expect(cn.type).toBe('element');
            expect(childElementNode.tagName).toBe(RSHDemoComment);
            expect(childElementNode.properties.commentDisplay).toBe(true);
          })
          expect((childNodes[0] as ElementNode).properties.child1).toBe(true);
          expect((childNodes[1] as ElementNode).properties.child2).toBe(true);
          
        })
      })
      describe('fragments', () => {
        it('should allow <>', () => {
          const nodes:RenderNode[] = [{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]}];
          expectFragmentsOk(nodes);
        })
        it('should allow React.Fragment', () => {
          const nodes:RenderNode[] = [{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"React.Fragment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"React.Fragment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]}];
          expectFragmentsOk(nodes);
        })
        it('should allow Fragment', () => {
          const nodes:RenderNode[] = [{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"Fragment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"Fragment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]}];
          expectFragmentsOk(nodes);
        })
        function expectFragmentsOk(nodes:RenderNode[]){
          const tagInterceptor = getCommentTagInterceptor();
          tagInterceptor(getNodeRenderDetails(nodes[0]));
          tagInterceptor(getNodeRenderDetails(nodes[1],1));
          tagInterceptor(getNodeRenderDetails(nodes[2],2));
          tagInterceptor(getNodeRenderDetails(nodes[3],3));
          const intercepted = tagInterceptor(getNodeRenderDetails(nodes[4],4));
          const interceptedNode = intercepted!.node as ElementNode;
          const reactFragmentNode = interceptedNode.children[0] as ElementNode;
          expect(reactFragmentNode.tagName).toBe(React.Fragment);
        }
        it('should ignore fragments when not children', () => {
          const nodes:RenderNode[] = [{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]}];
          const tagInterceptor = getCommentTagInterceptor();
          const nodeRenderDetails = getNodeRenderDetails(nodes[0]);
          const intercepted = tagInterceptor(nodeRenderDetails);
          expect(intercepted).toBe(nodeRenderDetails);
        })
      })

      
      describe('html tags', () => {
        describe('as children', () => {
          it('should allow elements with start and end tag', () => {
            const nodes:RenderNode[]=[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"text","value":"div"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","plain-text"]},"children":[{"type":"text","value":"content"}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"text","value":"div"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]}];
            const tagInterceptor = getCommentTagInterceptor();
            tagInterceptor(getNodeRenderDetails(nodes[0]));
            tagInterceptor(getNodeRenderDetails(nodes[1],1));
            tagInterceptor(getNodeRenderDetails(nodes[2],2));
            tagInterceptor(getNodeRenderDetails(nodes[3],3));
            const intercepted3 = tagInterceptor(getNodeRenderDetails(nodes[4],4));
            const finalNode = intercepted3!.node as ElementNode;
            expect(finalNode.type).toBe('element');
            expect(finalNode.children.length).toBe(1);
            const childNode = finalNode.children[0] as ElementNode;
            expect(childNode.type).toBe('element');
            expect(childNode.properties.display).toBe(undefined);
            expect(childNode.tagName).toBe('div');
          })
          it('should work with self closing', () => {
            const intercepted = renderTagContainingImage();
            const finalNode = intercepted!.node as ElementNode;
            expect(finalNode.type).toBe('element');
            expect(finalNode.children.length).toBe(1);
            const childNode = finalNode.children[0] as ElementNode;
            expect(childNode.type).toBe('element');
            expect(childNode.properties.display).toBe(undefined);
            expect(childNode.tagName).toBe('img');
          })
          it('should work with void elements missing optional /', () => {
            const nodes:RenderNode[]=[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"text","value":"img"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]}];
            const tagInterceptor = getCommentTagInterceptor();
            tagInterceptor(getNodeRenderDetails(nodes[0]));
            tagInterceptor(getNodeRenderDetails(nodes[1],1));
            const intercepted3 = tagInterceptor(getNodeRenderDetails(nodes[2],2));
            const finalNode = intercepted3!.node as ElementNode;
            expect(finalNode.type).toBe('element');
            expect(finalNode.children.length).toBe(1);
            const childNode = finalNode.children[0] as ElementNode;
            expect(childNode.type).toBe('element');
            expect(childNode.properties.display).toBe(undefined);
            expect(childNode.tagName).toBe('img');
          })
        })
        
        
        

        it('should ignore them when not children', () => {
          const nodes:RenderNode[] = [
          {
            "type":"element",
            "tagName":"span",
            "properties":{"className":["token","tag"]},
            "children":[
              {"type":"element",
              "tagName":"span",
              "properties":{"className":["token","tag"]},
              "children":[
                {"type":"element",
                "tagName":"span",
                "properties":{"className":["token","punctuation"]},
                "children":[{"type":"text","value":"<"}]
                },
                {"type":"text","value":"span"}
              ]},
              {"type":"element",
              "tagName":"span",
              "properties":{"className":["token","punctuation"]},
              "children":[{"type":"text","value":">"}]
              }
            ]
          },{
            "type":"element",
            "tagName":"span",
            "properties":{"className":["token","plain-text"]},
            "children":[{"type":"text","value":"Some span"}]
          },
          {
            "type":"element",
            "tagName":"span",
            "properties":{"className":["token","tag"]},
            "children":[
              {
                "type":"element",
                "tagName":"span",
                "properties":{"className":["token","tag"]},
                "children":[
                  {
                    "type":"element",
                    "tagName":"span",
                    "properties":{"className":["token","punctuation"]},
                    "children":[{"type":"text","value":"</"}]
                  },
                  {
                    "type":"text",
                    "value":"span"
                  }
                ]
              },
              {
                "type":"element",
                "tagName":"span",
                "properties":{"className":["token","punctuation"]},
                "children":[{"type":"text","value":">"}]
              }
            ]
          }];
          const tagInterceptor = getCommentTagInterceptor();
          let nodeRenderDetails = getNodeRenderDetails(nodes[0]);
          let intercepted = tagInterceptor(nodeRenderDetails);
          expect(intercepted).toBe(nodeRenderDetails);
          nodeRenderDetails = getNodeRenderDetails(nodes[1],1);
          intercepted = tagInterceptor(nodeRenderDetails);
          expect(intercepted).toBe(nodeRenderDetails);
          nodeRenderDetails = getNodeRenderDetails(nodes[2],2);
          intercepted = tagInterceptor(nodeRenderDetails);
          expect(intercepted).toBe(nodeRenderDetails);
        })
      })

      it('should delete properties.children if node.children', () => {
        const nodes:RenderNode[] = [{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","plain-text"]},"children":[{"type":"text","value":"\n  "}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","plain-text"]},"children":[{"type":"text","value":"\n    "}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","plain-text"]},"children":[{"type":"text","value":"\n  "}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","plain-text"]},"children":[{"type":"text","value":"\n"}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]}];
        const tagInterceptor = getCommentTagInterceptor();
        tagInterceptor(getNodeRenderDetails(nodes[0]));
        tagInterceptor(getNodeRenderDetails(nodes[1],1));
        tagInterceptor(getNodeRenderDetails(nodes[2],2));
        tagInterceptor(getNodeRenderDetails(nodes[3],3));
        tagInterceptor(getNodeRenderDetails(nodes[4],4));
        tagInterceptor(getNodeRenderDetails(nodes[5],5));
        tagInterceptor(getNodeRenderDetails(nodes[6],6));
        tagInterceptor(getNodeRenderDetails(nodes[7],7));
        const intercepted = tagInterceptor(getNodeRenderDetails(nodes[8],8));
        const interceptedNode=intercepted!.node as ElementNode;
        expect(interceptedNode.properties.children).toBeUndefined();
        expect(interceptedNode.children.length).toBeGreaterThan(0);
      })
    })

    describe('additional props', () => {
      describe('components', () => {
        it('should add prop commentDisplay as true', () => {
          const intercepted = interceptNoAttribute();
          const interceptedNode = intercepted!.node as ElementNode
          expect(interceptedNode.properties.commentDisplay).toBe(true);
        })
        describe('useInlineStyles true', () => {
          it('should pass react-syntax-highlighter style prop comment entry if useInlineStyles', () => {
            const intercepted = interceptNoAttribute();
            const interceptedNode = intercepted!.node as ElementNode;
            expect(interceptedNode.properties.commentStyleProp).toEqual(stylesheet.comment);
          })
          it('should spread other style props if the component specifies - array', () => {
            (RSHDemoComment as any).styleProps=['other']
            const intercepted = interceptNoAttribute();
            const interceptedNode = intercepted!.node as ElementNode
            expect(interceptedNode.properties.otherStyleProp).toEqual(stylesheet.other);
          })
          it('should spread other style props if the component specifies - string', () => {
            (RSHDemoComment as any).styleProps='other';
            const intercepted = interceptNoAttribute();
            const interceptedNode = intercepted!.node as ElementNode
            expect(interceptedNode.properties.otherStyleProp).toEqual(stylesheet.other);
          })
        })
        
        it('should not pass react-syntax-highlighter style prop comment entry if useInlineStyles false', () => {
          const intercepted = interceptNoAttribute(false);
          const interceptedNode = intercepted!.node as ElementNode
          expect(interceptedNode.properties.commentStyleProp).toBeUndefined();
        })
        
        describe('additional component props', () => {
          describe('respectStyleProp', ()=> {
            it('should be settable with createCommentTagInterceptor', () => {
              const tagInterceptor = getCommentTagInterceptor(false);
              const node= getSelfClosingDemoComponentNodeNoAttributes();
              const intercepted  = tagInterceptor(getNodeRenderDetails(node,0));
              const interceptedNode = intercepted!.node as ElementNode
              expect(interceptedNode.properties.respectStyleProp).toBe(false);
            });
            it('should default to true', () => {
              const tagInterceptor = getCommentTagInterceptor();
              const node= getSelfClosingDemoComponentNodeNoAttributes();
              const intercepted  = tagInterceptor(getNodeRenderDetails(node,0));
              const interceptedNode = intercepted!.node as ElementNode
              expect(interceptedNode.properties.respectStyleProp).toBe(true);
            })
            it('should be settable and overridable by the ComponentProvider', () => {
              const tagInterceptor = createCommentTagInterceptor(tagName => {
                if(tagName==='RSHDemoComment'){
                  return {type:RSHDemoComment,additionalProps:{respectStyleProp:false}}
                }
              })
              const node= getSelfClosingDemoComponentNodeNoAttributes();
              const intercepted  = tagInterceptor(getNodeRenderDetails(node,0));
              const interceptedNode = intercepted!.node as ElementNode
              expect(interceptedNode.properties.respectStyleProp).toBe(false);
            })
          })
          describe('additional component props from ComponentProvider', () => {
            function getNodeWithStyleProp(){
              const node:ElementNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"style"}]},{"type":"element","tagName":"span","properties":{"className":["token","script","language-javascript"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","script-punctuation","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"{"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"{"}]},{"type":"text","value":"color"},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":":"}]},{"type":"element","tagName":"span","properties":{"className":["token","string"]},"children":[{"type":"text","value":"'red'"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":","}]},{"type":"text","value":"backgroundColor"},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":":"}]},{"type":"element","tagName":"span","properties":{"className":["token","string"]},"children":[{"type":"text","value":"'blue'"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"}"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"}"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
              return node;
            }
            it('should be spread to node properties when no attributes', () => {
              const tagInterceptor = createCommentTagInterceptor(tagName => {
                if(tagName==='RSHDemoComment'){
                  return {type:RSHDemoComment,additionalProps:{prop1:'value1'}}
                }
              })
              const node= getSelfClosingDemoComponentNodeNoAttributes();
              const intercepted  = tagInterceptor(getNodeRenderDetails(node,0));
              const interceptedNode = intercepted!.node as ElementNode
              expect(interceptedNode.properties.prop1).toBe('value1');
            })

            interface AdditionalPropsTest{
              description:string
              merge:boolean,
              propsPrecedence:PropsPrecedence,
              expectedColorProp:string|undefined,
              expectedBackgroundColorProp:string|undefined,
              expectedFontStyleProp:string|undefined
            }
            const noMergeInstance:AdditionalPropsTest = {
              description:'Style from instance.  No merge. Precedence Instance',
              merge:false,
              propsPrecedence:PropsPrecedence.Instance,
              expectedColorProp:'red',
              expectedBackgroundColorProp:'blue',
              expectedFontStyleProp:undefined
            }
            const noMergeAdditional:AdditionalPropsTest = {
              description:'Style from additionalProps.  No merge. Precedence AdditionalProps',
              merge:false,
              propsPrecedence:PropsPrecedence.AdditionalProps,
              expectedColorProp:'pink',
              expectedBackgroundColorProp:undefined,
              expectedFontStyleProp:'italic'
            }
            const mergeInstance:AdditionalPropsTest = {
              description:'Merged. Precedence Instance',
              merge:true,
              propsPrecedence:PropsPrecedence.Instance,
              expectedColorProp:'red',
              expectedBackgroundColorProp:'blue',
              expectedFontStyleProp:'italic'
            }
            const mergeAdditional = {
              description:'Merged. Precedence AdditionalProps',
              merge:true,
              propsPrecedence:PropsPrecedence.AdditionalProps,
              expectedColorProp:'pink',
              expectedBackgroundColorProp:'blue',
              expectedFontStyleProp:'italic'
            }
            const additionalPropsTests:AdditionalPropsTest[] = [
              noMergeInstance,
              noMergeAdditional,
              mergeInstance,
              mergeAdditional
            ]
            additionalPropsTests.forEach(test => {
              it(`${test.description}`, () => {
                const tagInterceptor = createCommentTagInterceptor(tagName => {
                  if(tagName==='RSHDemoComment'){
                    return {
                      type:RSHDemoComment,
                      additionalProps:{
                        style:{
                          color:'pink', 
                          fontStyle:'italic'
                        }
                      },
                      mergeObjectProps:test.merge,
                      propsPrecedence:test.propsPrecedence}
                  }
                })
                const node= getNodeWithStyleProp();
                const intercepted  = tagInterceptor(getNodeRenderDetails(node,0));
                const interceptedNode = intercepted!.node as ElementNode
                expect(interceptedNode.properties.style!.color).toBe(test.expectedColorProp);
                expect(interceptedNode.properties.style!.backgroundColor).toBe(test.expectedBackgroundColorProp);
                expect(interceptedNode.properties.style!.fontStyle).toBe(test.expectedFontStyleProp);
              })
            })
          })
          
        })
      })
      describe('html tags', () => {
        it('should not have display prop', () => {
          const intercepted = renderTagContainingImage();
          const finalNode = intercepted!.node as ElementNode;
          const childNode = finalNode.children[0] as ElementNode;
          expect(childNode.properties.display).toBeUndefined();
        })
        it('should not have react-syntax-highlighter style prop comment entry', () => {
          const intercepted = renderTagContainingImage();
          const finalNode = intercepted!.node as ElementNode;
          const childNode = finalNode.children[0] as ElementNode;
          expect(childNode.properties.commentStyle).toBeUndefined();
        })

        it('should not have respectStyleProp', () => {
          const intercepted = renderTagContainingImage();
          const finalNode = intercepted!.node as ElementNode;
          const childNode = finalNode.children[0] as ElementNode;
          expect(childNode.properties.respectStyleProp).toBeUndefined();
        })
      })
      
    })
  
    describe('malformed', () => {
      describe('end tag no corresponding start tag', () => {
        it('should bail', () => {
          const nodes:RenderNode[]=[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"p"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","plain-text"]},"children":[{"type":"text","value":"\n"}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"text","value":"span"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","plain-text"]},"children":[{"type":"text","value":"child"}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"text","value":"span"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","plain-text"]},"children":[{"type":"text","value":"\n"}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"BadEnd"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]}];
          const tagInterceptor = getCommentTagInterceptor();
          for(let i=0;i<nodes.length;i++){
            const intercepted = tagInterceptor(getNodeRenderDetails(nodes[i],i));
            if(i<nodes.length-1){
              expect(intercepted).toBeUndefined();
            }else{
              const wrapperNode = intercepted!.node as ElementNode;
              expect(wrapperNode.tagName).toBe(React.Fragment);
              expect(wrapperNode.children.length).toBe(7);
              for(let i=0;i<nodes.length;i++){
                const wrappedNode=wrapperNode.children[i];
                expect(wrappedNode).toBe(nodes[i]);
                expect((wrappedNode as any).tagProcessed).toBe(true);
              }
            }
          }
          
          tagInterceptor(getNodeRenderDetails(nodes[0]));
          const nodeRenderDetails = getNodeRenderDetails(nodes[1],1);
          const intercepted = tagInterceptor(nodeRenderDetails);
          expect(intercepted).toBe(nodeRenderDetails);
        })
        
      })
    })

  })
  
  describe('non tag nodes', () => {
    it('should ignore if no stack', () => {
      expectIgnores(
        {
          "type":"element",
          "tagName":"span",
          "properties":{
            "className":["token","keyword"]
          },
          "children":[
            {
              "type":"text",
              "value":"function"
            }
          ]
        });
    });
    describe('has stack', () => {
      it('should return undefined if plain-text', () => {
        const nodes:RenderNode[] = [{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","plain-text"]},"children":[{"type":"text","value":"plain text"}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]}];
        const tagInterceptor = getCommentTagInterceptor();
        tagInterceptor(getNodeRenderDetails(nodes[0]));
        expect(tagInterceptor(getNodeRenderDetails(nodes[1],1))).toBeUndefined();
      });
      it('should bail if not plain text', () => {
        const nodes:RenderNode[] =[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"p"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","not-plain-text"]},"children":[{"type":"text","value":"not plain text"}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]}];
        const tagInterceptor = getCommentTagInterceptor();
        tagInterceptor(getNodeRenderDetails(nodes[0]));
        const nodeRenderDetails = getNodeRenderDetails(nodes[1],1);
        const intercepted = tagInterceptor(nodeRenderDetails);
        const node=intercepted!.node as ElementNode;
        expect(node.tagName).toBe(React.Fragment);
        expect(node.children.length).toBe(2);
        for(let i=0;i<2;i++){
          const wrappedNode = node.children[i];
          expect(wrappedNode).toBe(nodes[i]);
          expect((wrappedNode as any).tagProcessed).toBe(true);
        }
        
      })
    })
  })
  
  describe('bailing - should wrap all nodes in a fragment and mark as processed', () => {
    it('should bail when exception is thrown', () => {
      /*
        <RSHDemoComment><span>child</span></RSHDemoComment>
      */
      const nodes:RenderNode[]=[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"text","value":"span"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","plain-text"]},"children":[{"type":"text","value":"child"}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"text","value":"span"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"</"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]}];
      //there are 5 nodes ( which do not throw, purposely changing the last node)
      const tagInterceptor = getCommentTagInterceptor();
      for(let i=0;i<nodes.length-1;i++){
        expect(tagInterceptor(getNodeRenderDetails(nodes[i],i))).toBeUndefined();
      }
      const throwingNode={type:'element'} as any;
      const nodeRenderDetails = tagInterceptor(getNodeRenderDetails(throwingNode,4));

      const wrapperNode=nodeRenderDetails!.node as ElementNode;
      expect(wrapperNode.type).toBe('element');
      expect(wrapperNode.tagName).toBe(React.Fragment);
      expect(wrapperNode.properties.className).toEqual([]);

      const children=wrapperNode.children;
      expect(children.length).toBe(5);
      for(let i=0;i<nodes.length-1;i++){
        const child=children[i];
        expect(child).toBe(nodes[i]);
        expect((child as any).tagProcessed).toBe(true);
      }
      expect(children[4]).toBe(throwingNode);
      expect(throwingNode.tagProcessed).toBe(true);
    })
    
    it('should bail when malformed array prop', () => {
      const tagInterceptor = getCommentTagInterceptor();
      const node:RenderNode = {"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","attr-name"]},"children":[{"type":"text","value":"array"}]},{"type":"element","tagName":"span","properties":{"className":["token","script","language-javascript"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","script-punctuation","punctuation"]},"children":[{"type":"text","value":"="}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"{"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"["}]},{"type":"element","tagName":"span","properties":{"className":["token","string"]},
      "children":[
        {"type":"text","value":"'this is'"}
      ]},
      {"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},
      "children":[{"type":"text","value":","}]},
      {"type":"text","value":" 'malformed"},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"]"}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"}"}]}]},{"type":"text","value":" "},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"/>"}]}]};
      const nodeRenderDetails = getNodeRenderDetails(node);
      expect(tagInterceptor(nodeRenderDetails)).toBe(nodeRenderDetails);
    })
    
    it('should not get in an infinite cyle', () => {
      const tagInterceptor = getCommentTagInterceptor();
      const node:RenderNode={"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","tag"]},"children":[{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":"<"}]},{"type":"element","tagName":"span","properties":{"className":["token","class-name"]},"children":[{"type":"text","value":"RSHDemoComment"}]}]},{"type":"element","tagName":"span","properties":{"className":["token","punctuation"]},"children":[{"type":"text","value":">"}]}]};
      //normal processing
      const nodeRenderDetails = getNodeRenderDetails(node);
      expect(tagInterceptor(nodeRenderDetails)).toBe(undefined);
      //after bail
      (node as any).tagProcessed = true;
      expect(tagInterceptor(nodeRenderDetails)).toBe(nodeRenderDetails);
    })
  })
  
})