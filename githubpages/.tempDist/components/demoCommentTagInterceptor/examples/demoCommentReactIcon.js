"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var common_1 = require("./common");
var src_1 = require("../../../../../src");
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
exports.DemoCommentReactIcon = function () {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Typography_1.default, null, "Nothing to explain here."),
        react_1.default.createElement(common_1.ExampleCode, { commentTagProvider: common_1.createOnlyComponentProvider(src_1.CommentReactIcon) }, "<CommentReactIcon/>"));
};
