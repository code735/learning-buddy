"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var htmlElementSlice_1 = __importDefault(require("./features/htmlElementSlice"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        htmlElement: htmlElementSlice_1.default
    },
});
//# sourceMappingURL=store.js.map