export class Computacion {
    constructor(id, tipo, nombre, anno, cantidad) {
        this.id = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.anno = anno;
        this.cantidad = cantidad;
    }
}

export class Matematicas {
    constructor(id, tipo, nombre, anno, cantidad) {
        this.id = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.anno = anno;
        this.cantidad = cantidad;
    }
}

export class Psicologia {
    constructor(id, tipo, nombre, anno, cantidad) {
        this.id = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.anno = anno;
        this.cantidad = cantidad;
    }
}

export class Literatura {
    constructor(id, tipo, nombre, anno, cantidad) {
        this.id = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.anno = anno;
        this.cantidad = cantidad;
    }
}

export class Biblioteca {
    #cantidad = 0;
    #nombreLibreria = "";
    #registros = [];

    constructor(nombreBiblioteca) {
        this.#nombreLibreria = nombreBiblioteca;
    }

    getRecords() {
        return this.#cantidad;
    }

    getNombreBiblioteca(){
        return this.#nombreLibreria;
    }

    agregarRegistro(objetoLibro){
        this.#registros.push(objetoLibro);
        this.#cantidad = this.#registros.length;

        console.log(this.#registros);
    }

    limpiarRegistros(){
        this.#registros = [];
        this.#cantidad = 0;
    }

    obtenerRegistros(){
        return this.#registros;
    }
}

export const arregloBiblioteca = new Biblioteca("e-contact Library");