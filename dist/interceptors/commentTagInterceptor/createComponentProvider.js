"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponentProvider = function (components) {
    var finder = exports.createComponentFinder(components);
    var componentProvider = function (tagName) {
        return finder(tagName);
    };
    return componentProvider;
};
exports.createComponentFinder = function (components) {
    function find(tagName) {
        return components.find(function (ct) { return ct.displayName.toLowerCase() === tagName.toLowerCase(); });
    }
    return function (tagName) {
        var parts = tagName.split('.');
        if (parts.length === 1) {
            return find(tagName);
        }
        else {
            return find(parts[parts.length - 1]);
        }
    };
};
//# sourceMappingURL=createComponentProvider.js.map