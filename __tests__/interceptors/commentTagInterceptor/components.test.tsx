import '@testing-library/jest-dom';
import React from 'react';
import {render, getDefaultNormalizer, getByText as getByTextGlobal} from '@testing-library/react';
import { Coloured, Comment, CommentLink, ColorNameComponents, CommentPlaceholder, CommentStyle, StyleColour, FontComponents} from '../../../src'
const ATextDecorationType = FontComponents.UlOlLtWavyAliceblue;
describe('components', () => {
  // could use https://testing-library.com/docs/dom-testing-library/api-helpers#buildqueries ?  
  // or screen ?
  function getByTextExactNoTrim(container:HTMLElement,text:string){
    return getByTextGlobal(container,text, {
      exact:true,
      normalizer:getDefaultNormalizer({trim:false})
    });
  }
  describe('commentDisplay', () => {

    function shouldNotRenderIfCommentDisplayIsNotTrue(jsx:JSX.Element,findText:string){
      const clone = React.cloneElement(jsx,{commentDisplay:true});
      const {container} = render(clone);
      getByTextExactNoTrim(container,findText);
  
      [false,undefined].forEach(commentDisplay => {
        const clone = React.cloneElement(jsx,{commentDisplay});
        const { container } = render(clone);
        expect(()=>getByTextExactNoTrim(container,findText)).toThrow();
      })
    }
    const commentDisplayTests:Array<[JSX.Element,string,string?]> = [
      [<Coloured color='pink'>Coloured</Coloured>,'Coloured'],
      [<ColorNameComponents.Aliceblue>Aliceblue</ColorNameComponents.Aliceblue>,'Aliceblue'],
      [<Comment/>,'Comment','// '],
      [<CommentLink>CommentLink</CommentLink>,'CommentLink'],
      [<CommentPlaceholder><span>CommentPlaceholder</span></CommentPlaceholder>,'CommentPlaceholder'],
      [<CommentStyle>CommentStyle</CommentStyle>,'CommentStyle'],
      [<StyleColour>StyleColour</StyleColour>,'StyleColour'],
      [<ATextDecorationType>UlOlLtWavyAliceblue</ATextDecorationType>,'UlOlLtWavyAliceblue']
    ]
    commentDisplayTests.forEach(test => {
      const [element,testName,find] = test;
      const textToFind = find || testName;
      describe(`${testName}`, ()=> {
        
        it('should render with commentDisplay true', () => {
          const clone = React.cloneElement(element,{commentDisplay:true});
          const {container} = render(clone);
          getByTextExactNoTrim(container,textToFind);
        })
        it('should not render if commentDisplay is false or undefined', () => {
          shouldNotRenderIfCommentDisplayIsNotTrue(element,textToFind);
        })
      })
    })
  })

  describe('displayName', () => {
    //todo return to the any type
    const commentDisplayNameTests:Array<[any,string]> = [
      [Coloured,'Coloured'],
      [ColorNameComponents.Aliceblue,'Aliceblue'],
      [Comment,'Comment'],
      [CommentLink,'CommentLink'],
      [CommentPlaceholder,'CommentPlaceholder'],
      [CommentStyle,'CommentStyle'],
      [StyleColour,'StyleColour'],
      [ATextDecorationType,'UlOlLtWavyAliceblue']
    ]
    commentDisplayNameTests.forEach(test => {
      const [type,expectedDisplayName] = test;
      it(`should have display name - ${expectedDisplayName}`, () => {
        expect(type.displayName).toBe(expectedDisplayName)
      })
    })
  })
  

  //common test should not render anything when commentDisplay is false or undefined

  //todo children - in new branch or after commit
  describe('Colours', () => {
    describe('Coloured', () => {
      const findText = 'No render';
      function getColoured(commentDisplay=false){
        if(commentDisplay){
          return <Coloured commentDisplay color='pink'>{findText}</Coloured>
        }
        return <Coloured color='pink'>{findText}</Coloured>
      }
      
      describe('rendering', () => {
        let rendered:HTMLSpanElement
        function displayColouredPink(){
          const {getByText} = render(getColoured(true));
          rendered = getByText(findText);
        }
        describe('text child', () => {
          it('should render span with text if commentDisplay', () => {
            displayColouredPink();
            expect(rendered.tagName).toBe('SPAN');
          })
          describe('style', () => {
            interface TextStyleTest{
              description:string,
              respectStyleProp:boolean,
              commentStyleProp?:React.CSSProperties,
              style?:React.CSSProperties,
              expectedStyle:Record<string,unknown>
              isNotExpectation?:true

            }
            const tests:TextStyleTest[] = [
              {
                description:'should respect the respectStyleProp true',
                respectStyleProp:true,
                commentStyleProp:{
                  backgroundColor:'red'
                },
                expectedStyle:{backgroundColor:'red'}
              },
              {
                description:'should respect the respectStyleProp false',
                respectStyleProp:false,
                commentStyleProp:{
                  backgroundColor:'red'
                },
                expectedStyle:{backgroundColor:'red'},
                isNotExpectation:true
              },
              {
                description:'should not throw if no commentStyleProp',
                respectStyleProp:false,
                expectedStyle:{color:'pink'},
              },
              {
                description:'should give precedence to style prop over commentStyleProp',
                respectStyleProp:true,
                commentStyleProp:{background:'red'},
                style:{background:'blue'},
                expectedStyle:{background:'blue'}
              },
              {
                description:'should give precedence to color over style prop and commentStyleProp',
                respectStyleProp:true,
                commentStyleProp:{color:'red'},
                style:{color:'blue'},
                expectedStyle:{color:'pink'}
              }
            ]
            tests.forEach(test => {
              it(`${test.description}`, () => {
                const {getByText} = render(<Coloured 
                  respectStyleProp={test.respectStyleProp} 
                  commentStyleProp={test.commentStyleProp} 
                  style={test.style}
                  commentDisplay 
                  color='pink'>
                    {findText}
                  </Coloured>)
                const coloured = getByText(findText);
                if(test.isNotExpectation){
                  expect(coloured).not.toHaveStyle(test.expectedStyle)
                }else{
                  expect(coloured).toHaveStyle(test.expectedStyle)
                }
                
              })
            })
          })
        })
        
      })
      
    })
    describe('Generated', () => {
      //should use the same tests as above or should mock for this one time 
      //should do the latter
    })
  })

  describe('Comment', () => {
    describe('should render respected single line comment chars with a space', () =>{
      [true,false].forEach(respectStyleProp => {
        it(`respectStyleProp ${respectStyleProp}`, () => {
          const {container} = render(<Comment respectStyleProp={respectStyleProp} commentDisplay commentStyleProp={{color:'red'}}><span>comment</span></Comment>);
          const comment = getByTextExactNoTrim(container,'// ');
          if(respectStyleProp){
            expect(comment).toHaveStyle({color:'red'}); 
          }else{
            expect(comment).not.toHaveStyle({color:'red'});
          }
          
        })
      })
     
    })
    it('should render children after the comment chars', () => {
      const {container} = render(<Comment commentDisplay ><span>comment</span></Comment>);
      expect(container.children[0].innerHTML).toBe('// ');
      expect(container.children[1].innerHTML).toBe('comment');
    })
  });

  describe('MultiComment', ()=> {

  })

  describe('CommentLink', () => {
    
    it('should render a link element', () => {
      const { getByText } = render(
        <CommentLink commentDisplay>Comment</CommentLink>);
      expect(getByText('Comment').tagName).toBe('A');
    });
    it('should forward link props apart from style', () => {
      const { getByText } = render(
        <CommentLink commentDisplay href="some href">Comment</CommentLink>);
      expect(getByText('Comment')).toHaveAttribute('href','some href');
    });
    describe('styling', () => {
      it('should request link style props', () => {
        expect((CommentLink as any).styleProps).toBe('link');
      });
      // this may change - consider comment with green text - should that mean green link ?
      it('should never use the commentStyleProp',() => {
        const { getByText } = render(
          <CommentLink 
            commentStyleProp={{color:'red'}} 
            respectStyleProp 
            commentDisplay 
            href="some href">Comment</CommentLink>);
        expect(getByText('Comment')).not.toHaveStyle({color:'red'});
      });
      it('should respect the linkStyleProp',() => {
        const { getByText } = render(
          <CommentLink 
            linkStyleProp={{color:'red'}}
            respectStyleProp 
            commentDisplay 
            href="some href">Comment</CommentLink>);
            expect(getByText('Comment')).toHaveStyle({color:'red'});
      });
      it('should respect respectStyleProp',() => {
        const { getByText } = render(
          <CommentLink 
            linkStyleProp={{color:'red'}}
            respectStyleProp={false} 
            commentDisplay 
            href="some href">Comment</CommentLink>);
            expect(getByText('Comment')).not.toHaveStyle({color:'red'});
      });
      it(`should give precedence to the link's style prop`, () => {
        const { getByText } = render(
          <CommentLink 
            linkStyleProp={{color:'red'}}
            style={{color:'blue'}}
            respectStyleProp={false} 
            commentDisplay 
            href="some href">Comment</CommentLink>);
            expect(getByText('Comment')).toHaveStyle({color:'blue'});
      })
    })
    
  })

  /* only displayName and commentDisplay - covered above
    describe('CommentPlaceholder', () => {

    }) 
  */

  describe('CommentStyle', () => {
    it('always uses the commentStyleProp', () => {
      const { getByText } = render(
      <CommentStyle 
        commentDisplay 
        respectStyleProp={false} 
        commentStyleProp={{color:'red'}}
      >Comment</CommentStyle>);
      expect(getByText('Comment')).toHaveStyle({color:'red'});
    })
  })
  describe('StyleColor', () => {
    it('always only uses the color from commentStyleProp', () => {
      const { getByText } = render(
      <StyleColour 
        commentDisplay 
        respectStyleProp={false} 
        commentStyleProp={{color:'red',backgroundColor:'blue'}}
      >Comment</StyleColour>);
      expect(getByText('Comment')).toHaveStyle({color:'red'});
      expect(getByText('Comment')).not.toHaveStyle({backgroundColor:'blue'});
    })
  })

  describe('font components', () => {

    describe('generated ( generateStylePropAwareComponentsInternal )', () => {
      

      // might test the generateStylePropAwareComponents passes through ....

      /*
        'UlWavyIndianred':{textDecorationColor:'indianred',textDecorationStyle:'wavy',textDecorationLine:'underline',},
      */
    })
    
    describe('TextDecoration', () => {

    })

  })

  describe('htmlComponents', () => {

  })

  

  describe('StyledComment', () => {
    describe('StyledComment', () => {

    })

    describe('RedComment', ()=> {

    })
  })

  

  describe('CommentReactIcon', () => {

  })
})