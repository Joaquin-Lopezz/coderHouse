export function notNull(valor, str) {
    if (valor == null && valor == undefined) {
        throw new Error(`ingrese el dato ${str}`);
    }
    return valor;
}
