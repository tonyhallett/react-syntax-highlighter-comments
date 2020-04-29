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
Object.defineProperty(exports, "__esModule", { value: true });
var string_object_to_object_1 = require("string-object-to-object");
var getComponentDetails_1 = require("./getComponentDetails");
var types_1 = require("./types");
var TagElementNodeType;
(function (TagElementNodeType) {
    TagElementNodeType[TagElementNodeType["AttributeName"] = 0] = "AttributeName";
    TagElementNodeType[TagElementNodeType["StringValue"] = 1] = "StringValue";
    TagElementNodeType[TagElementNodeType["CurlyBraces"] = 2] = "CurlyBraces";
    TagElementNodeType[TagElementNodeType["Unknown"] = 3] = "Unknown";
})(TagElementNodeType || (TagElementNodeType = {}));
function getTagElementNodeType(elementNode) {
    var className = elementNode.properties.className;
    if (className.indexOf('attr-name') !== -1) {
        return TagElementNodeType.AttributeName;
    }
    else if (className.indexOf('attr-value') !== -1) {
        return TagElementNodeType.StringValue;
    }
    else if (className.indexOf('language-javascript') !== -1) {
        return TagElementNodeType.CurlyBraces;
    }
    return TagElementNodeType.Unknown;
}
function getAttributes(rootNode) {
    function getAttributeName(attributeNode) {
        return attributeNode.children[0].value;
    }
    var elementAttributes = [];
    var attributeNode;
    var children = rootNode.children;
    for (var i = 1; i < children.length - 1; i++) {
        var node = children[i];
        if (node.type === 'element') {
            var nodeType = getTagElementNodeType(node);
            if (nodeType === TagElementNodeType.Unknown) {
                return undefined;
            }
            if (nodeType === TagElementNodeType.AttributeName) {
                if (attributeNode) {
                    elementAttributes.push({ name: getAttributeName(attributeNode), elementNodeDetails: undefined });
                }
                attributeNode = node;
            }
            else {
                if (attributeNode === undefined) {
                    return undefined;
                }
                elementAttributes.push({ name: getAttributeName(attributeNode), elementNodeDetails: { node: node, type: nodeType } });
                attributeNode = undefined;
            }
        }
    }
    if (attributeNode) {
        elementAttributes.push({ name: getAttributeName(attributeNode), elementNodeDetails: undefined });
    }
    return elementAttributes;
}
function getStringAttributeValue(node) {
    if (!(node.children.length === 3 || node.children.length === 4)) {
        return { valid: false, value: '' };
    }
    if (node.children.length === 3) {
        return { valid: true, value: '' };
    }
    return { valid: true, value: node.children[2].value };
}
exports.getStringAttributeValue = getStringAttributeValue;
function getCurlyAttributeValueAsString(node) {
    var children = node.children;
    var text = '';
    for (var i = 2; i < children.length - 1; i++) {
        var node_1 = children[i];
        if (node_1.type === 'text') {
            text += node_1.value;
        }
        else {
            text += node_1.children[0].value;
        }
    }
    return text.trim();
}
function getCurlyAttributeValue(node) {
    var asString = getCurlyAttributeValueAsString(node);
    if (asString === 'false') {
        return { valid: true, value: false };
    }
    if (asString === 'true') {
        return { valid: true, value: true };
    }
    if (asString === 'null') {
        return { valid: true, value: null };
    }
    if (asString === 'undefined') {
        return { valid: true, value: undefined };
    }
    if (asString.indexOf('[') === 0) {
        var parser_1 = new string_object_to_object_1.StringToObjectParser();
        var processResult_1 = string_object_to_object_1.ProcessResult.Break;
        var fakeObject_1 = "{arrayProp: " + asString + "}";
        for (var x = 1, c = ''; c = fakeObject_1.charAt(x); x++) {
            processResult_1 = parser_1.process(c);
            if (processResult_1 === string_object_to_object_1.ProcessResult.Break) {
                return { valid: false, value: undefined };
            }
        }
        if (processResult_1 === string_object_to_object_1.ProcessResult.Completed) {
            return { valid: true, value: parser_1.getCompleted().arrayProp };
        }
        return { valid: false, value: undefined };
    }
    if (asString.indexOf('{') === 0) {
        var parser_2 = new string_object_to_object_1.StringToObjectParser();
        var processResult_2 = string_object_to_object_1.ProcessResult.Break;
        for (var x = 1, c = ''; c = asString.charAt(x); x++) {
            processResult_2 = parser_2.process(c);
            if (processResult_2 === string_object_to_object_1.ProcessResult.Break) {
                return { valid: false, value: undefined };
            }
        }
        if (processResult_2 === string_object_to_object_1.ProcessResult.Completed) {
            return { valid: true, value: parser_2.getCompleted() };
        }
        return { valid: false, value: undefined };
    }
    var parser = new string_object_to_object_1.StringToObjectParser();
    var processResult = string_object_to_object_1.ProcessResult.Break;
    var fakeObject = "{numberProp: " + asString + "}";
    for (var x = 1, c = ''; c = fakeObject.charAt(x); x++) {
        processResult = parser.process(c);
        if (processResult === string_object_to_object_1.ProcessResult.Break) {
            return { valid: false, value: undefined };
        }
    }
    return { valid: true, value: parser.getCompleted().numberProp };
}
function isObject(test) {
    return test !== null && !Array.isArray(test) && typeof test === 'object';
}
function mergeObjectPropsOperation(properties, additionalProps, propsPrecedence) {
    var first = propsPrecedence === types_1.PropsPrecedence.AdditionalProps ? properties : additionalProps;
    var precedence = propsPrecedence === types_1.PropsPrecedence.AdditionalProps ? additionalProps : properties;
    var newProperties = {};
    Object.keys(first).forEach(function (prop) {
        var firstProp = first[prop];
        if (isObject(firstProp)) {
            newProperties[prop] = __assign({}, firstProp);
        }
        else {
            newProperties[prop] = firstProp;
        }
    });
    Object.keys(precedence).forEach(function (prop) {
        var precedenceProp = precedence[prop];
        var precedencePropIsObject = isObject(precedenceProp);
        if (precedencePropIsObject) {
            precedenceProp = __assign({}, precedenceProp);
        }
        var firstProp = newProperties[prop];
        var setPrecedence = true;
        if (firstProp && isObject(firstProp) && precedencePropIsObject) {
            newProperties[prop] = __assign(__assign({}, firstProp), precedenceProp);
            setPrecedence = false;
        }
        if (setPrecedence) {
            newProperties[prop] = precedenceProp;
        }
    });
    return newProperties;
}
function getProperties(node, componentType, nodeRenderDetails, globalRespectStyleProp, additionalComponentProps, propsPrecedence, mergeObjectProps, styleProps) {
    var attributes = getAttributes(node);
    if (attributes) {
        additionalComponentProps = __assign({ respectStyleProp: globalRespectStyleProp }, additionalComponentProps);
        var additionalProps = attributes.map(function (a) {
            var valueDetails;
            if (a.elementNodeDetails === undefined) {
                valueDetails = { valid: true, value: true };
            }
            else {
                if (a.elementNodeDetails.type === TagElementNodeType.StringValue) {
                    valueDetails = getStringAttributeValue(a.elementNodeDetails.node);
                }
                else {
                    valueDetails = getCurlyAttributeValue(a.elementNodeDetails.node);
                }
            }
            return { name: a.name, valueDetails: valueDetails };
        });
        var properties_1 = { className: [] };
        for (var i = 0; i < additionalProps.length; i++) {
            var additionalProp = additionalProps[i];
            if (!additionalProp.valueDetails.valid) {
                return undefined;
            }
            properties_1[additionalProp.name] = additionalProp.valueDetails.value;
        }
        if (componentType === getComponentDetails_1.ComponentType.Component) {
            properties_1.commentDisplay = true;
            if (mergeObjectProps) {
                properties_1 = mergeObjectPropsOperation(properties_1, additionalComponentProps, propsPrecedence);
            }
            else {
                if (propsPrecedence === types_1.PropsPrecedence.AdditionalProps) {
                    properties_1 = __assign(__assign({}, properties_1), additionalComponentProps);
                }
                else {
                    properties_1 = __assign(__assign({}, additionalComponentProps), properties_1);
                }
            }
        }
        if (nodeRenderDetails.useInlineStyles && componentType === getComponentDetails_1.ComponentType.Component) {
            var stylesheet_1 = nodeRenderDetails.stylesheet;
            styleProps.push('comment');
            styleProps.forEach(function (styleProp) {
                var stylesheetStyle = stylesheet_1[styleProp];
                if (stylesheetStyle) {
                    properties_1[styleProp + "StyleProp"] = __assign({}, stylesheetStyle);
                }
            });
        }
        return properties_1;
    }
}
exports.getProperties = getProperties;
//# sourceMappingURL=getProperties.js.map