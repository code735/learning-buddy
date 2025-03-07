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
var react_redux_1 = require("react-redux");
var htmlElementSlice_1 = require("../../store/features/htmlElementSlice");
var SearchOutlined_1 = __importDefault(require("@mui/icons-material/SearchOutlined"));
var icons_material_1 = require("@mui/icons-material");
function Rightsidebar() {
    // Redux
    var dispatch = (0, react_redux_1.useDispatch)();
    var htmlElementRedux = (0, react_redux_1.useSelector)(function (state) { return state.htmlElement.allHtmlTags; });
    // useStates
    var _a = (0, react_1.useState)([
        { property: "color", inputType: "color-picker" },
        { property: "background-color", inputType: "color-picker" },
        { property: "font-size", inputType: "number-input" },
        { property: "font-family", inputType: "font" },
        { property: "padding", inputType: "four-box-input" },
        { property: "margin", inputType: "four-box-input" },
        { property: "border", inputType: "border" },
        { property: "border-radius", inputType: "number-input" },
        { property: "width", inputType: "number-input" },
        { property: "height", inputType: "number-input" },
        { property: "line-height", inputType: "number-input" },
        { property: "letter-spacing", inputType: "number-input" },
        { property: "text-align", inputType: "options-box", options: ["left", "center", "right", "justify"] },
        { property: "display", inputType: "search-options-box", options: ["inline", "block", "flex", "contents", "grid", "table", "table-row", "table-column"] },
        { property: "justify-content", inputType: "options-box", options: ["center", "flex-start", "flex-end", "space-between", "space-around"] },
        { property: "align-items", inputType: "options-box", options: ["flex-start", "center", "flex-end", "stretch", "baseline"] },
        { property: "position", inputType: "options-box", options: ["static", "relative", "absolute", "fixed", "sticky"] },
        { property: "top", inputType: "number-input" },
        { property: "right", inputType: "number-input" },
        { property: "bottom", inputType: "number-input" },
        { property: "left", inputType: "number-input" },
        { property: "box-shadow", inputType: "box-shadow-input" },
        { property: "opacity", inputType: "slider" },
        { property: "overflow", inputType: "options-box", options: ["visible", "hidden", "scroll", "auto"] },
        { property: "cursor", inputType: "options-box", options: ["default", "pointer", "move", "text", "wait", "crosshair", "not-allowed"] }
    ]), cssProperties = _a[0], setCssProperties = _a[1];
    // if there are more than 6 options then use search-options-box otherwise use options box
    var _b = (0, react_1.useState)(''), selectedValue = _b[0], setSelectedValue = _b[1];
    var _c = (0, react_1.useState)(''), inputValue = _c[0], setInputValue = _c[1];
    var _d = (0, react_1.useState)(false), focusedInput = _d[0], setFocusedInput = _d[1];
    // useEffects
    (0, react_1.useEffect)(function () {
        console.log("htmlElementRedux", htmlElementRedux);
    }, [htmlElementRedux]);
    // Functions
    var addElement = function () {
        if (selectedValue) {
            dispatch((0, htmlElementSlice_1.addRootHtmlElement)(selectedValue));
        }
    };
    return (react_1.default.createElement("div", { className: 'right-sidebar' },
        react_1.default.createElement("div", { className: "searchbar-addicon-container" },
            react_1.default.createElement("div", { className: "search-icon" },
                react_1.default.createElement(SearchOutlined_1.default, null)),
            react_1.default.createElement("div", { className: "search-bar" },
                react_1.default.createElement("input", { type: "text", placeholder: 'Add CSS...', value: inputValue, onChange: function (e) { setInputValue(e.target.value); }, onFocus: function () { return setFocusedInput(true); } })),
            focusedInput ? react_1.default.createElement("div", { className: "close-icon-container", onClick: function () { setFocusedInput(false); } },
                react_1.default.createElement(icons_material_1.Close, null)) : react_1.default.createElement("div", { className: "add-html-icon", onClick: addElement },
                react_1.default.createElement("div", { className: "add-icon-container" },
                    react_1.default.createElement(icons_material_1.Add, null)))),
        react_1.default.createElement("div", { className: "suggestions-container" }, focusedInput && (cssProperties === null || cssProperties === void 0 ? void 0 : cssProperties.map(function (el) {
            return react_1.default.createElement("div", { className: "suggestion" }, el.property);
        })))));
}
exports.default = Rightsidebar;
//# sourceMappingURL=Rightsidebar.js.map