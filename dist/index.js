"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var users_1 = __importDefault(require("./users"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = parseInt(process.env.PORT || '3000');
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
// app.get('/', (req: Request, res: Response) => res.send('Hello World!'));
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
//# sourceMappingURL=index.js.map