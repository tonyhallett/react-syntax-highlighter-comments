import * as React from "react";
export function DemoIntro(){
  return <>
    <h1>Intro</h1>
    <p>
      react-syntax-highlighter-comments builds upon react-syntax-highlighter-render-interceptor to provide a syntax for
      styling comments rendered by react-syntax-highlighter in the comments themselves.  There is also a comment syntax for rendering your own components or html elements.  
      If you do not like rendering components based upon a new syntax it is possible for actual jsx to be read and generated.
    </p>
    <h1>react-syntax-highlighter built in styling</h1>
    <p>react-syntax-highlighter parses the code string that you provide to 'nodes'.  These nodes and rendered to spans that are styled based upon the style prop.  
      For functionality beyond this you need to understand the renderer prop and the 'nodes' format.
    </p>
    <h1>react-syntax-highlighter-render-interceptor</h1>
    <p>As described in full detail here.  This package is the internal renderer used by react-syntax-highlighter-render-interceptor with a couple of tweaks to 
      the logic and with the addition of two concepts, style creators and interceptors.  The interceptor function gets run first. It can change the react element 
      and its props that will be rendered.  It can also prevent the node being rendered. The style creator function is run if the useInlineStyles prop is true. With 
      this function it is possible to control the styles applied to the react element that will be rendered for the node.  If you want more than one style creator 
      or interceptor there are the createChainedStyleCreator and createChainedNodeRenderInterceptor functions.
    </p>
    <p>By using this custom renderer we get the normal behaviour and a simple method of controlling the render.  If you want to write your own style creator or node render 
      interceptor the <a href='https://tonyhallett.github.io/react-syntax-highlighter-render-interceptor/'>react-syntax-highlighter-render-interceptor demo</a> allows 
      entering the code string and copying the generated nodes both for Prism and Light.
    </p>
    <h1>react-syntax-highlighter-comments</h1>
    <p>This package provides style creators and interceptors that you can use on their own or within a chain as arguments to createCustomRenderer.  
    To make life easier there are react components that create the custom renderer for you.  There is SyntaxHighlighterComments which includes all of the style creators 
    and all of the node render interceptors.  Other components have a subset of the available style creators and node render interceptors.  For instance, 
    SyntaxHighlighterXXXComments only has a single style creator and no interceptors.  The style creator will style a comment that contains *** red.
    </p>
    <p>There is a logic grouping of the style creators and interceptors.</p>
    </>
}