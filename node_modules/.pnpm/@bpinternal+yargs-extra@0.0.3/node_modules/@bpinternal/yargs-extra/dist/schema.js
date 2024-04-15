"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSchema = void 0;
const generateSchema = (yargSchema) => {
    const properties = {};
    for (const param in yargSchema) {
        const yargProp = yargSchema[param];
        const { type, description, choices, array } = yargProp;
        let props = {
            type,
            description
        };
        if (array) {
            props = { ...props, type: 'array', items: { type } };
        }
        if (choices) {
            props = { ...props, enum: choices };
        }
        properties[param] = props;
    }
    const schema = {
        type: 'object',
        properties
    };
    return schema;
};
exports.generateSchema = generateSchema;
//# sourceMappingURL=schema.js.map