"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var common_1 = require("./common");
var src_1 = require("../../../../../src");
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
exports.TestStyles = function () {
    var code = "\n<Red>Red</Red>\n<Red><Span style={{background:'white'}}>Span</Span></Red>\n<Red><span>span</span></Red>\n<Italic>Italic</Italic>\n\n<XXXLarge><Bold>large</Bold></XXXLarge>\n<Bold><XXXLarge>bold</XXXLarge></Bold>\n";
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Typography_1.default, null, "Nothing to explain here."),
        react_1.default.createElement(common_1.ExampleCode, { additionalStyle: {
                comment: {
                //fontSize:'small'
                }
            }, commentTagProvider: function (tagName) {
                var found = src_1.builtInComponentFinder(tagName);
                if (tagName === 'Red') {
                    return {
                        type: found,
                        additionalProps: {
                            style: {
                                color: 'green'
                            }
                        }
                    };
                }
                if (tagName === 'Italic') {
                    return {
                        type: found,
                        additionalProps: {
                            style: {
                                fontSize: 'xxx-large'
                            }
                        }
                    };
                }
                return found;
            } }, code));
};
//will then demo Red with additional style prop does not work
