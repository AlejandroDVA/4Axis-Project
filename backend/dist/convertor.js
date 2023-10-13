"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converterStringToNumber = exports.converterUF = void 0;
const converterUF = (ufValue, valor) => {
    const result = ufValue * valor;
    const roundedResult = Math.ceil(result);
    return roundedResult;
};
exports.converterUF = converterUF;
const converterStringToNumber = (value) => {
    try {
        return parseFloat(value);
    }
    catch (error) {
        console.log("Error en el valor a convertir");
    }
    return null;
};
exports.converterStringToNumber = converterStringToNumber;
//# sourceMappingURL=convertor.js.map