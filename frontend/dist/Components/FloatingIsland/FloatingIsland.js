"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var KeyboardArrowUp_1 = __importDefault(require("@mui/icons-material/KeyboardArrowUp"));
var material_1 = require("@mui/material");
var react_redux_1 = require("react-redux");
function FloatingIsland() {
    var _a = (0, react_1.useState)(false), isDrawerOpen = _a[0], setIsDrawerOpen = _a[1];
    var allHtmlTags = (0, react_redux_1.useSelector)(function (state) { return state.htmlElement; }).allHtmlTags;
    var _b = (0, react_1.useState)(allHtmlTags), htmlElements = _b[0], setHtmlElements = _b[1];
    return (react_1.default.createElement("div", { className: 'island-drawer' },
        react_1.default.createElement(material_1.Button, { onClick: function () {
                setIsDrawerOpen(true);
            } },
            react_1.default.createElement(KeyboardArrowUp_1.default, null)),
        react_1.default.createElement(material_1.Drawer, { anchor: "bottom", open: isDrawerOpen, onClose: function () {
                setIsDrawerOpen(false);
            } },
            react_1.default.createElement("div", { className: "html-tags-container" }, (allHtmlTags === null || allHtmlTags === void 0 ? void 0 : allHtmlTags.length) > 0 ? allHtmlTags === null || allHtmlTags === void 0 ? void 0 : allHtmlTags.map(function (el) {
                return react_1.default.createElement("div", { className: "html-tag" },
                    react_1.default.createElement("div", { className: "tag-name" }, el.rootElement));
            }) : react_1.default.createElement(react_1.default.Fragment, null, "Elements not added yet")))));
}
exports.default = FloatingIsland;
//# sourceMappingURL=FloatingIsland.js.map