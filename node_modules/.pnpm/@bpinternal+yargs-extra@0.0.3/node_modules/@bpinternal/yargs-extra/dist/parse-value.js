"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseValue = void 0;
const yn_1 = __importDefault(require("yn"));
const parseSingleValue = (yargSchema, envVarValue) => {
    var _a;
    if (yargSchema.type === 'string') {
        const parsed = envVarValue;
        return parsed;
    }
    if (yargSchema.type === 'number') {
        const parsed = parseFloat(envVarValue);
        if (isNaN(parsed)) {
            return;
        }
        return parsed;
    }
    if (yargSchema.type === 'boolean') {
        const parsed = !!(0, yn_1.default)(envVarValue);
        return parsed;
    }
    if ((_a = yargSchema.choices) === null || _a === void 0 ? void 0 : _a.includes(envVarValue)) {
        const parsed = envVarValue;
        return parsed;
    }
};
const parseValue = (yargSchema, envVarValue) => {
    if (yargSchema.array) {
        const parts = envVarValue.split(' ');
        const parsed = parts
            .map((part) => parseSingleValue(yargSchema, part))
            .filter((v) => v !== undefined);
        return parsed;
    }
    return parseSingleValue(yargSchema, envVarValue);
};
exports.parseValue = parseValue;
//# sourceMappingURL=parse-value.js.map