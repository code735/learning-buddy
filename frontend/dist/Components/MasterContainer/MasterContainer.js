"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Leftsidebar_1 = __importDefault(require("../Leftsidebar/Leftsidebar"));
var Pageeditor_1 = __importDefault(require("../Pageeditor/Pageeditor"));
var Rightsidebar_1 = __importDefault(require("../RightSidebar/Rightsidebar"));
var Navbar_1 = __importDefault(require("../Navbar/Navbar"));
function MasterContainer() {
    return (react_1.default.createElement("div", { className: "main-container" },
        react_1.default.createElement(Navbar_1.default, null),
        react_1.default.createElement("div", { className: "sidebar-and-editor-container" },
            react_1.default.createElement(Leftsidebar_1.default, null),
            react_1.default.createElement(Pageeditor_1.default, null),
            react_1.default.createElement(Rightsidebar_1.default, null))));
}
exports.default = MasterContainer;
//# sourceMappingURL=MasterContainer.js.map