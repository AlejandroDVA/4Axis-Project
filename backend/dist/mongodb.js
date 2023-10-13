"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const uri = "mongodb+srv://admin:OT2O4X3qU6WO5Rgn@cluster0.rrn19fc.mongodb.net/?retryWrites=true&w=majority";
exports.connection = mongoose_1.default
    .connect(uri, { retryWrites: true, w: 'majority' });
//# sourceMappingURL=mongodb.js.map