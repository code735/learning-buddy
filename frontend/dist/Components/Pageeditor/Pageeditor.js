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
var FloatingIsland_1 = __importDefault(require("../FloatingIsland/FloatingIsland"));
var react_redux_1 = require("react-redux");
var htmlElementSlice_1 = require("../../store/features/htmlElementSlice");
function PageEditor() {
    // useSelector and useDispatch
    var _a = (0, react_redux_1.useSelector)(function (state) { return state.htmlElement; }), allHtmlTags = _a.allHtmlTags, currentSelectedTag = _a.currentSelectedTag;
    var dispatch = (0, react_redux_1.useDispatch)();
    // useRefs
    var elementRefs = (0, react_1.useRef)({});
    // useEffects
    (0, react_1.useEffect)(function () {
        // console.log("currentSelectedTag-allHtmlTags", currentSelectedTag, allHtmlTags);
    }, [currentSelectedTag, allHtmlTags]);
    // Functions
    var addComputedStyles = function (currentRef) {
        if (currentRef) {
            var computedStyles = window.getComputedStyle(currentRef);
            console.log("Computed Styles:", computedStyles);
        }
    };
    // console.log("elementRefs",elementRefs)
    return (react_1.default.createElement("div", { className: 'page-editor' },
        react_1.default.createElement("div", { className: "main-page-playarea" }, allHtmlTags === null || allHtmlTags === void 0 ? void 0 : allHtmlTags.map(function (el) {
            var elementId = el.id;
            return react_1.default.createElement(el.rootElement, {
                key: elementId,
                ref: function (ref) {
                    if (ref) {
                        elementRefs.current[elementId] = ref;
                    }
                },
                className: "root-element ".concat((currentSelectedTag === null || currentSelectedTag === void 0 ? void 0 : currentSelectedTag.id) === elementId ? 'selected-element' : ''),
                onClick: function () {
                    addComputedStyles(elementRefs.current[elementId]);
                    if ((currentSelectedTag === null || currentSelectedTag === void 0 ? void 0 : currentSelectedTag.id) === elementId) {
                        dispatch((0, htmlElementSlice_1.addCurrentSelectedTag)({}));
                    }
                    else {
                        dispatch((0, htmlElementSlice_1.addCurrentSelectedTag)(el));
                    }
                }
            });
        })),
        react_1.default.createElement("div", { className: "island-container" },
            react_1.default.createElement(FloatingIsland_1.default, null))));
}
exports.default = PageEditor;
//# sourceMappingURL=Pageeditor.js.map