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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupConfig = exports.defaultConfig = exports.generateSchema = exports.parseValue = exports.parseEnv = void 0;
const yargs_1 = __importDefault(require("yargs"));
__exportStar(require("./type-utils"), exports);
var parse_env_1 = require("./parse-env");
Object.defineProperty(exports, "parseEnv", { enumerable: true, get: function () { return parse_env_1.parseEnv; } });
var parse_value_1 = require("./parse-value");
Object.defineProperty(exports, "parseValue", { enumerable: true, get: function () { return parse_value_1.parseValue; } });
var schema_1 = require("./schema");
Object.defineProperty(exports, "generateSchema", { enumerable: true, get: function () { return schema_1.generateSchema; } });
var defaults_1 = require("./defaults");
Object.defineProperty(exports, "defaultConfig", { enumerable: true, get: function () { return defaults_1.defaultConfig; } });
var cleanup_1 = require("./cleanup");
Object.defineProperty(exports, "cleanupConfig", { enumerable: true, get: function () { return cleanup_1.cleanupConfig; } });
exports.default = yargs_1.default;
//# sourceMappingURL=index.js.map