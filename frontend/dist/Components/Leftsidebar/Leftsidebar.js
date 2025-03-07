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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var SearchOutlined_1 = __importDefault(require("@mui/icons-material/SearchOutlined"));
var htmlElementSlice_1 = require("../../store/features/htmlElementSlice");
var icons_material_1 = require("@mui/icons-material");
function Leftsidebar() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var htmlElementRedux = (0, react_redux_1.useSelector)(function (state) { return state.htmlElement.allHtmlTags; });
    var switchControlRedux = (0, react_redux_1.useSelector)(function (state) { return state.htmlElement.switchControl; });
    var currentSelectedTag = (0, react_redux_1.useSelector)(function (state) { return state.htmlElement.currentSelectedTag; });
    // HTML Elements List with both tagName and tag JSX elements
    var htmlElementsList = [
        { tagName: 'div', fullName: 'division', tag: "</div>" },
        { tagName: 'span', fullName: 'span', tag: "</span>" },
        { tagName: 'p', fullName: 'paragraph', tag: "</p>" },
        { tagName: 'a', fullName: 'anchor', tag: "</a>" },
        { tagName: 'img', fullName: 'image', tag: "<img/>" },
        { tagName: 'ul', fullName: 'unordered list', tag: "</ul>" },
        { tagName: 'ol', fullName: 'ordered list', tag: "</ol>" },
        { tagName: 'li', fullName: 'list item', tag: "</li>" },
        { tagName: 'h1', fullName: 'heading 1', tag: "</h1>" },
        { tagName: 'h2', fullName: 'heading 2', tag: "</h2>" },
        { tagName: 'h3', fullName: 'heading 3', tag: "</h3>" },
        { tagName: 'button', fullName: 'button', tag: "</button>" },
        { tagName: 'input', fullName: 'input field', tag: "<input/>" },
        { tagName: 'form', fullName: 'form', tag: "</form>" },
        { tagName: 'label', fullName: 'label', tag: "</label>" },
        { tagName: 'table', fullName: 'table', tag: "</table>" },
        { tagName: 'nav', fullName: 'navigation', tag: "</nav>" },
        { tagName: 'header', fullName: 'header', tag: "</header>" },
        { tagName: 'footer', fullName: 'footer', tag: "</footer>" },
        { tagName: 'section', fullName: 'section', tag: "</section>" },
        { tagName: 'article', fullName: 'article', tag: "</article>" },
        { tagName: 'aside', fullName: 'aside', tag: "</aside>" },
        { tagName: 'main', fullName: 'main content area', tag: "</main>" },
        { tagName: 'figure', fullName: 'figure', tag: "</figure>" },
        { tagName: 'figcaption', fullName: 'figure caption', tag: "</figcaption>" },
        { tagName: 'video', fullName: 'video', tag: "</video>" },
        { tagName: 'audio', fullName: 'audio', tag: "</audio>" },
        { tagName: 'canvas', fullName: 'canvas', tag: "</canvas>" },
        { tagName: 'iframe', fullName: 'inline frame', tag: "</iframe>" },
        { tagName: 'blockquote', fullName: 'blockquote', tag: "</blockquote>" },
        { tagName: 'code', fullName: 'code', tag: "</code>" },
        { tagName: 'pre', fullName: 'preformatted text', tag: "</pre>" },
    ];
    // State for storing the input value and the filtered suggestions
    var _a = (0, react_1.useState)(''), inputValue = _a[0], setInputValue = _a[1];
    var _b = (0, react_1.useState)([]), suggestions = _b[0], setSuggestions = _b[1];
    // Useeffects
    (0, react_1.useEffect)(function () {
        console.log("htmlElementRedux", htmlElementRedux);
    }, [htmlElementRedux]);
    (0, react_1.useEffect)(function () {
        var filteredSuggestions = htmlElementsList.map(function (element) {
            if (element.tagName.toLowerCase().startsWith(inputValue.toLowerCase())) {
                return element.tagName;
            }
        });
        var topSuggestions = htmlElementsList === null || htmlElementsList === void 0 ? void 0 : htmlElementsList.filter(function (element) { return filteredSuggestions.includes(element.tagName); });
        var removedSuggestions = htmlElementsList === null || htmlElementsList === void 0 ? void 0 : htmlElementsList.filter(function (element) { return !filteredSuggestions.includes(element.tagName); });
        setSuggestions(__spreadArray(__spreadArray([], topSuggestions, true), removedSuggestions, true));
    }, [inputValue]);
    // Functions 
    var switchLeftSidebarFunctionalities = function (functionality) {
        switch (functionality) {
            case "search-dom":
                return react_1.default.createElement(react_1.default.Fragment, null);
                break;
            case "add-html":
                return react_1.default.createElement(react_1.default.Fragment, null);
                break;
            default: return react_1.default.createElement(react_1.default.Fragment, null);
        }
    };
    var addElement = function () {
        var selectedElement = suggestions.find(function (el) { return (el === null || el === void 0 ? void 0 : el.tagName) === inputValue; });
        if (selectedElement) {
            var element = react_1.default.createElement(selectedElement === null || selectedElement === void 0 ? void 0 : selectedElement.tagName);
            dispatch((0, htmlElementSlice_1.addRootHtmlElement)({
                "rootElement": selectedElement === null || selectedElement === void 0 ? void 0 : selectedElement.tagName,
                "styles": [
                    {
                        "temp": "temp"
                    }
                ]
            }));
        }
    };
    var deleteHtmlTag = function (element) {
        dispatch((0, htmlElementSlice_1.deleteElement)(element));
    };
    var selectTag = function (element) {
        dispatch((0, htmlElementSlice_1.addCurrentSelectedTag)(element));
    };
    return (react_1.default.createElement("div", { className: 'left-sidebar' },
        react_1.default.createElement("div", { className: "left-sidebar-navigation" },
            react_1.default.createElement("div", { className: "nav-options" },
                react_1.default.createElement("div", { className: "search-option" },
                    react_1.default.createElement("div", { className: "search-icon ".concat(switchControlRedux == "search-dom" && "selected") },
                        react_1.default.createElement(SearchOutlined_1.default, null)),
                    switchControlRedux === 'add-html' ? (react_1.default.createElement("div", { className: "searchbar-addicon-container" },
                        react_1.default.createElement("div", { className: "search-bar" },
                            react_1.default.createElement("input", { type: "text", placeholder: 'Add HTML...', value: inputValue, onChange: function (e) { return setInputValue(e.target.value); } })),
                        inputValue && react_1.default.createElement("div", { className: "close-icon", onClick: function () { setInputValue(""); } },
                            react_1.default.createElement(icons_material_1.Close, null)),
                        react_1.default.createElement("div", { className: "add-html-icon", onClick: addElement },
                            react_1.default.createElement(icons_material_1.Add, null)))) : (react_1.default.createElement("div", { className: "search-option-text" },
                        react_1.default.createElement("p", null, "DOM")))),
                switchControlRedux === "search-dom" && react_1.default.createElement("div", { className: "close-option", onClick: function () { return dispatch((0, htmlElementSlice_1.handleSwitchController)("off")); } },
                    react_1.default.createElement(icons_material_1.Close, null)))),
        react_1.default.createElement("div", { className: "left-sidebar-container" },
            switchControlRedux === "add-html" && (react_1.default.createElement("div", { className: "suggestions-container" }, suggestions === null || suggestions === void 0 ? void 0 : suggestions.map(function (el, index) { return (react_1.default.createElement("div", { className: 'html-element', key: index, style: { cursor: "pointer" }, onClick: function () { return setInputValue(el.tagName); } },
                react_1.default.createElement("span", { className: 'tag' }, el === null || el === void 0 ? void 0 : el.tag))); }))),
            react_1.default.createElement("div", { className: "dom-container" }, (htmlElementRedux === null || htmlElementRedux === void 0 ? void 0 : htmlElementRedux.length) > 0 && (htmlElementRedux === null || htmlElementRedux === void 0 ? void 0 : htmlElementRedux.map(function (el) {
                return react_1.default.createElement("div", { className: "html-tag ".concat((currentSelectedTag === null || currentSelectedTag === void 0 ? void 0 : currentSelectedTag.id) == el.id && "selected"), onClick: function () { selectTag(el); } },
                    react_1.default.createElement("div", { className: "tag-name" },
                        react_1.default.createElement("span", null, el.rootElement)),
                    react_1.default.createElement("div", { className: "delete-btn", onClick: function () { deleteHtmlTag(el); } },
                        react_1.default.createElement(icons_material_1.Delete, null)));
            }))),
            switchLeftSidebarFunctionalities(switchControlRedux))));
}
exports.default = Leftsidebar;
//# sourceMappingURL=Leftsidebar.js.map