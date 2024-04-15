"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
const defaultConfig = (yargSchema) => {
    let defaults = {};
    for (const param in yargSchema) {
        const yargProp = yargSchema[param];
        const { default: _default } = yargProp;
        defaults = { ...defaults, [param]: _default };
    }
    return defaults;
};
exports.defaultConfig = defaultConfig;
//# sourceMappingURL=defaults.js.map