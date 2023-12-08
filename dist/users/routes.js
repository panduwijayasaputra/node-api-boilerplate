"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = __importDefault(require("./controllers"));
var router = express_1.default.Router();
exports.default = (function () {
    router.get('/', controllers_1.default.getUsers);
    router.post('/register', controllers_1.default.createUser);
});
//# sourceMappingURL=routes.js.map