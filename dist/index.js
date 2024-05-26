"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api/data', (req, res) => {
    res.json({ message: 'Olá do Node.js com TypeScript!' });
});
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
