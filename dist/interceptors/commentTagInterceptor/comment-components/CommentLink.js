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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.CommentLink = function (_a) {
    var commentDisplay = _a.commentDisplay, commentStyleProp = _a.commentStyleProp, _b = _a.linkStyleProp, linkStyleProp = _b === void 0 ? {} : _b, children = _a.children, respectStyleProp = _a.respectStyleProp, linkProps = __rest(_a, ["commentDisplay", "commentStyleProp", "linkStyleProp", "children", "respectStyleProp"]);
    if (commentDisplay) {
        linkProps = linkProps || {};
        var linkPropsStyle = linkProps.style || {};
        var respectedLinkStyle = respectStyleProp ? linkStyleProp : {};
        var mergedStyle = __assign(__assign({}, respectedLinkStyle), linkPropsStyle);
        return React.createElement("a", __assign({}, linkProps, { style: mergedStyle }), children);
    }
    return null;
};
exports.CommentLink.displayName = 'CommentLink';
exports.CommentLink.styleProps = 'link';
/* export const CommentLink:CommentTagType<{linkProps?:LinkProps,linkStyleProp?:React.CSSProperties}> = (
  {
    commentDisplay,
    linkProps ={},
    linkStyleProp ={},
    children,
    respectStyleProp})=>{
  if(commentDisplay){
    const linkPropsStyle = linkProps.style||{};
    const respectedLinkStyle = respectStyleProp?linkStyleProp:{};
    const mergedStyle = {...respectedLinkStyle,...linkPropsStyle}
    return <a {...linkProps} style={mergedStyle}>{children}</a>
  }
  return null;
} */ 
//# sourceMappingURL=CommentLink.js.map