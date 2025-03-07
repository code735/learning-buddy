"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteElement = exports.handleSwitchController = exports.addCurrentSelectedTag = exports.addRootHtmlElement = exports.htmlElementSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    allHtmlTags: [],
    switchControl: "add-html",
    currentSelectedTag: null
};
exports.htmlElementSlice = (0, toolkit_1.createSlice)({
    name: "htmlElement",
    initialState: initialState,
    reducers: {
        addRootHtmlElement: function (state, _a) {
            var _b;
            var payload = _a.payload;
            console.log("payload", payload);
            var htmlTagObjPayload = {
                "id": ((_b = state.allHtmlTags) === null || _b === void 0 ? void 0 : _b.length) + 1,
                "rootElement": payload.rootElement,
                "styles": payload.styles,
                "childElements": []
            };
            state.allHtmlTags = __spreadArray(__spreadArray([], state.allHtmlTags, true), [
                htmlTagObjPayload
            ], false);
        },
        deleteElement: function (state, _a) {
            var _b, _c;
            var payload = _a.payload;
            var filteredArray = (_b = state.allHtmlTags) === null || _b === void 0 ? void 0 : _b.filter(function (item) { return item.id !== payload.id; });
            state.allHtmlTags = (_c = state.allHtmlTags) === null || _c === void 0 ? void 0 : _c.filter(function (item) { return item.id !== payload.id; });
        },
        addCurrentSelectedTag: function (state, _a) {
            var payload = _a.payload;
            state.currentSelectedTag = payload;
        },
        handleSwitchController: function (state, _a) {
            var payload = _a.payload;
            state.switchControl = payload;
        }
    }
});
exports.addRootHtmlElement = (_a = exports.htmlElementSlice.actions, _a.addRootHtmlElement), exports.addCurrentSelectedTag = _a.addCurrentSelectedTag, exports.handleSwitchController = _a.handleSwitchController, exports.deleteElement = _a.deleteElement;
exports.default = exports.htmlElementSlice.reducer;
//# sourceMappingURL=htmlElementSlice.js.map