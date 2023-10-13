"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const historySchema = new mongoose_1.default.Schema({
    activityDate: String,
    user: String,
    originAmount: String,
    convertionDate: String,
    coinValue: String,
    convertionAmount: String,
});
exports.default = historySchema;
//# sourceMappingURL=historySchema.js.map