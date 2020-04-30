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
exports.CommentLink = function (_a) {
    var commentDisplay = _a.commentDisplay, _b = _a.linkProps, linkProps = _b === void 0 ? {} : _b, _c = _a.linkStyleProp, linkStyleProp = _c === void 0 ? {} : _c, children = _a.children, respectStyleProp = _a.respectStyleProp;
    if (commentDisplay) {
        var linkPropsStyle = linkProps.style || {};
        var mergedStyle = __assign(__assign({}, (respectStyleProp ? linkStyleProp : {})), linkPropsStyle);
        return React.createElement("a", __assign({}, linkProps, { style: mergedStyle }), children);
    }
    return null;
};
exports.CommentLink.displayName = 'CommentLink';
exports.CommentLink.styleProps = 'link';
//# sourceMappingURL=CommentLink.js.map