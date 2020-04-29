"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isFirstNode_1 = require("../../../helpers/isFirstNode");
var TagStack_1 = require("./TagStack");
var nodeHelpers_1 = require("./nodeHelpers");
var getTagDetails_1 = require("./getTagDetails");
var getComponentDetails_1 = require("./getComponentDetails");
var getProperties_1 = require("./getProperties");
var extractComponentTypeDetails_1 = require("./extractComponentTypeDetails");
function getStyleProps(type, componentType) {
    var styleProps = type === getComponentDetails_1.ComponentType.Component ? componentType.styleProps || [] : [];
    if (typeof styleProps === 'string') {
        styleProps = [styleProps];
    }
    return styleProps;
}
exports.createCommentTagInterceptor = function (componentProvider, globalRespectStyleProp) {
    if (globalRespectStyleProp === void 0) { globalRespectStyleProp = true; }
    var tagStack;
    var commentTagInterceptor = (function (nodeRenderDetails) {
        if (isFirstNode_1.isFirstNode(nodeRenderDetails)) {
            tagStack = new TagStack_1.TagStack();
        }
        // possible that may throw during text area code typing
        try {
            var node = nodeRenderDetails.node;
            if (tagStack.nodeProcessed(node)) {
                return nodeRenderDetails;
            }
            else {
                if (nodeHelpers_1.nodeIsTag(node)) {
                    var tagDetails = getTagDetails_1.getTagDetails(node);
                    if (tagDetails) {
                        var tagName = tagDetails.tagName, tagType = tagDetails.tagType;
                        if (tagType === getTagDetails_1.TagType.Start || tagType === getTagDetails_1.TagType.SelfClosing) {
                            var _a = getComponentDetails_1.getComponentDetails(tagName, componentProvider), componentTypeDetails = _a.componentTypeDetails, type = _a.type;
                            if (componentTypeDetails !== undefined) {
                                var _b = extractComponentTypeDetails_1.extractComponentTypeDetails(componentTypeDetails), additionalProps = _b.additionalProps, mergeObjectProps = _b.mergeObjectProps, propsPrecedence = _b.propsPrecedence, componentType = _b.componentType;
                                var styleProps = getStyleProps(type, componentType);
                                var properties = getProperties_1.getProperties(node, type, nodeRenderDetails, globalRespectStyleProp, additionalProps, propsPrecedence, mergeObjectProps, styleProps);
                                if (properties) {
                                    if (tagType === getTagDetails_1.TagType.Start) {
                                        return tagStack.processStart(nodeRenderDetails, componentType, tagName, properties);
                                    }
                                    return tagStack.processSelfClosing(nodeRenderDetails, componentType, properties);
                                }
                            }
                        }
                        else {
                            return tagStack.processEnd(nodeRenderDetails, tagName);
                        }
                    }
                    return tagStack.bail(nodeRenderDetails);
                }
                return tagStack.processNonTagNode(nodeRenderDetails);
            }
        }
        catch (e) {
            /* istanbul ignore if*/
            if (process && process.env && process.env.NODE_ENV !== 'test') {
                console.log('comment tag interceptor error.');
                console.log(e.message);
            }
            return tagStack.bail(nodeRenderDetails);
        }
    });
    return commentTagInterceptor;
};
//# sourceMappingURL=commentTagInterceptor.js.map