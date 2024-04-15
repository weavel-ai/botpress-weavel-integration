"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEnv = void 0;
const decamelize_1 = __importDefault(require("decamelize"));
const lodash_1 = __importDefault(require("lodash"));
const parse_value_1 = require("./parse-value");
const tryExtractingFromEnv = (paramName, schema, prefix) => {
    const possibleNames = [paramName];
    const { alias } = schema;
    if (lodash_1.default.isString(alias) && alias) {
        possibleNames.push(alias);
    }
    else if (lodash_1.default.isArray(alias)) {
        possibleNames.push(...alias);
    }
    for (const paramAlias of possibleNames) {
        let envVarName = (0, decamelize_1.default)(paramAlias, { preserveConsecutiveUppercase: true, separator: '_' }).toUpperCase();
        envVarName = prefix ? `${prefix.toUpperCase()}_${envVarName}` : envVarName;
        const envVarValue = process.env[envVarName];
        if (!envVarValue) {
            continue;
        }
        const parsedEnvValue = (0, parse_value_1.parseValue)(schema, envVarValue);
        if (parsedEnvValue !== undefined) {
            return parsedEnvValue;
        }
    }
};
/**
 *
 * Fills the argv datastructure returned by yargs with value of environment variables.
 * For the CLI parameter --languageURL the expected environment variable is LANGUAGE_URL
 *
 * @param yargsSchema the yargs builder parameter that declares what named parameters are required
 * @param argv the filled argv datastructure returned by yargs
 */
const parseEnv = (yargsSchema, prefix = undefined) => {
    const returned = {};
    for (const param in yargsSchema) {
        const schema = yargsSchema[param];
        const extracted = tryExtractingFromEnv(param, schema, prefix);
        if (extracted !== undefined) {
            returned[param] = extracted;
        }
    }
    return returned;
};
exports.parseEnv = parseEnv;
//# sourceMappingURL=parse-env.js.map