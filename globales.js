export const expresiones_regulares = {
	id: /^[0-9]{8}$/,
    texto: /^\s*$/
}

export const variables_globales = {
    anno_minimo: 1950,
    anno_maximo: 2024,
    cantidad_minima: 1,
    cantidad_maxima: 1000,
    error_timeout: 2000,
    registro_exitoso_timeout: 1500
}

export const respuestas_globales = {
    id_formato: "El campo ID tiene que ser de 8 dígitos y solo puede contener numeros.",
    id_duplicado: "El ID ingresado ya se encuentra registrado, se debe reemplazar.",
    tipo_incorrecto: "Debe seleccionar un tipo de libro.",
    nombre_incorrecto: "Debe ingresar un nombre válido para el libro",
    anno_incorrecto: "Debe ingresar el año de edición del libro.",
    anno_fuera_rango: `Debe ingresar un año entre ${variables_globales.anno_minimo} y ${variables_globales.anno_maximo}.`,
    cantidad_incorrecta: "Debe ingresar una cantidad válida de libros.",
    cantidad_fuera_rango: `Debe ingresar una cantidad entre ${variables_globales.cantidad_minima} y ${variables_globales.cantidad_maxima}.`,
    ingreso_exitoso: "El nuevo libro ha sido registrado exitosamente."
}

