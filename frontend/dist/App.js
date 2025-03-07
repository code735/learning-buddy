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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./Styles/App.scss");
var icons_material_1 = require("@mui/icons-material");
function App() {
    var _this = this;
    var textareaRef = (0, react_1.useRef)(null);
    var responseContainerRef = (0, react_1.useRef)(null);
    var inputContainerRef = (0, react_1.useRef)(null);
    var markdown = "\n  # Hello, Markdown!\n  This is **bold**, *italic*, and `inline code`.\n\n\n  ```js\n  console.log(\"Code block!\");\n  ```\n\n  - Item 1\n  - Item 2\n  ";
    var _a = (0, react_1.useState)(null), ReactMarkdown = _a[0], setReactMarkdown = _a[1];
    var _b = (0, react_1.useState)(null), remarkGfm = _b[0], setRemarkGfm = _b[1];
    (0, react_1.useEffect)(function () {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var markdownModule, gfmModule;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, import("react-markdown")];
                    case 1:
                        markdownModule = _a.sent();
                        return [4 /*yield*/, import("remark-gfm")];
                    case 2:
                        gfmModule = _a.sent();
                        setReactMarkdown(function () { return markdownModule.default; });
                        setRemarkGfm(function () { return gfmModule.default; });
                        return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    // states
    var _c = (0, react_1.useState)(false), open = _c[0], setOpen = _c[1];
    // functions
    var handleClose = function () {
        setOpen(false);
    };
    var handleOpen = function () {
        setOpen(true);
    };
    var handleInput = function () {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
        }
        handleChangeResponseContainerHeight();
    };
    var handleChangeResponseContainerHeight = function () {
        if (responseContainerRef.current && inputContainerRef.current) {
            responseContainerRef.current.style.height =
                "calc(100vh - " + inputContainerRef.current.scrollHeight + "px)";
        }
    };
    if (!ReactMarkdown || !remarkGfm)
        return react_1.default.createElement("p", null, "Loading...");
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement("div", { className: "main-container" },
            react_1.default.createElement("div", { className: "sidebar-container" }),
            react_1.default.createElement("div", { className: "chat-container" },
                react_1.default.createElement("div", { ref: responseContainerRef, className: "response-container" },
                    react_1.default.createElement("div", { className: "response-block" },
                        react_1.default.createElement(ReactMarkdown, null, markdown))),
                react_1.default.createElement("div", { ref: inputContainerRef, className: "input-container" },
                    react_1.default.createElement("div", { className: "input-block" },
                        react_1.default.createElement("textarea", { ref: textareaRef, onInput: handleInput, placeholder: "Ask PDF..." }),
                        react_1.default.createElement("div", { className: "input-tool-container" },
                            react_1.default.createElement("div", { className: "tool-button" },
                                react_1.default.createElement(icons_material_1.AttachFile, { className: "tool-icon" })),
                            react_1.default.createElement("div", { className: "tool-button", style: { background: "white", borderRadius: "50%" } },
                                react_1.default.createElement(icons_material_1.SendRounded, { className: "tool-icon", style: {
                                        transform: "rotate(-45deg)",
                                        color: "#323232",
                                        paddingLeft: "4px",
                                    } })))))))));
}
exports.default = App;
//# sourceMappingURL=App.js.map