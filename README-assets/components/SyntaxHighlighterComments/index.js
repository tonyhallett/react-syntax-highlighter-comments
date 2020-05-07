"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var dist_1 = require("../../../dist");
var react_syntax_highlighter_1 = require("react-syntax-highlighter");
var prism_1 = require("react-syntax-highlighter/dist/cjs/styles/prism");
var code = "\n// normal comment without react-syntax-highlighter-comments\n// triple asterisk turns red ***\n";
var syntaxHighlighterComments = function () { return React.createElement(dist_1.SyntaxHighlighterComments
/* commentMatchReplaceStyler={(comment)=>{
  const replaced = comment.replace('upsidedown','');
  if(replaced!==comment){
    return {
      newComment:replaced,
      matchStyle:{transform:'rotate(180deg)',display:'inline-block'}
    }
  }
}} */
//typeInterceptorDetails={[{name:'Demo',component:DemoTypeComponent}]} 
//respectStyleProp={respectStyleProp}
/* commentTagProvider={
(tagName) => {
  if(tagName==='AdditionalProps'){
    return {
      type:AdditionalProps,
      additionalProps:{
        prefix:'Hi',
        style:{
          color:'blue',
          fontStyle:'italic'
        }
      },
      propsPrecedence:propsPrecedence?PropsPrecedence.Instance:PropsPrecedence.AdditionalProps,
      mergeObjectProps
    }
  }
  const found = builtInComponentFinder(tagName);
  if(found && tagName === 'Red'){
    return {
      type:found,
      additionalProps:{
        respectStyleProp:respectStylePropRed
      }
    }
  }
  return found;
  
}
} */ , null,
    React.createElement(react_syntax_highlighter_1.Prism, { language: 'tsx', style: __assign(__assign({}, prism_1.atomDark), {
            yellow: { color: 'yellow' },
            italic: { fontStyle: 'italic' },
            green: { color: 'green' },
            bold: { fontWeight: 'bolder' },
            big: { fontSize: '125%' },
            link: { color: 'orange' },
        }) }, code)); };
exports.default = syntaxHighlighterComments;
