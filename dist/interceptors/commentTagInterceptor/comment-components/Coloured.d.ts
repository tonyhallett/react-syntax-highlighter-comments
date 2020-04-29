import { colorNamesObject } from "../../../helpers/colorNames";
import { DisplayReactFCObject } from '../helpers';
import { CommentTagType } from "./common";
export declare const Coloured: CommentTagType<{
    color: string;
}>;
declare type ColorNameComponentsType = DisplayReactFCObject<typeof colorNamesObject>;
export declare const ColorNameComponents: ColorNameComponentsType;
export {};
