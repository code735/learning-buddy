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
var Html_1 = __importDefault(require("@mui/icons-material/Html"));
var react_redux_1 = require("react-redux");
var htmlElementSlice_1 = require("../../store/features/htmlElementSlice");
function Navbar() {
    var _a = (0, react_1.useState)(""), selectedOption = _a[0], setselectedOption = _a[1];
    var dispatch = (0, react_redux_1.useDispatch)();
    var switchControl = (0, react_redux_1.useSelector)(function (state) { return state.htmlElement; }).switchControl;
    console.log("switchControl", switchControl);
    return (react_1.default.createElement("div", { className: 'navbar' },
        react_1.default.createElement("div", { className: "options-container" },
            react_1.default.createElement("div", { onClick: function () {
                    dispatch((0, htmlElementSlice_1.handleSwitchController)("add-html"));
                }, className: "html-icon add-html option-icons ".concat(switchControl === 'add-html' && "selected-option") },
                react_1.default.createElement(Html_1.default, null)))));
}
exports.default = Navbar;
//# sourceMappingURL=Navbar.js.map