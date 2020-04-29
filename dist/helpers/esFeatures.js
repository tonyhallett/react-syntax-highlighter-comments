"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayFind(arr, predicate) {
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (predicate(item)) {
            return item;
        }
    }
}
exports.arrayFind = arrayFind;
function stringStartsWith(searchString, chars) {
    return searchString.indexOf(chars) === 0;
}
exports.stringStartsWith = stringStartsWith;
//# sourceMappingURL=esFeatures.js.map