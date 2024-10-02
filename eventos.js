import { respuestas_globales, variables_globales } from "./globales.js";
import { Computacion, Literatura, Psicologia, Matematicas, arregloBiblioteca } from "./clases.js";
import { inicializarSearchxID, addNewRecord, addNewSelectFilter, showInformacionGeneral, validateIDValue, 
         validateEmptyValue, validaRangeValue, showRegistroExistoso, cleanFormData, existeIdRegistrado, 
         validateFormInputs, findRecordsxId, updateDatalistObjects
       } from "./funciones.js";

const camposFormulario = {
    id:false,
    tipo:false,
    nombre:false,
    anno:false,
    cantidad:false
}

window.onload = function() {
    const contenedor = document.getElementById("contenedor-searchxID");
    const newSelect = document.createElement("select");

    newSelect.setAttribute("id","inputSearchID");
    newSelect.setAttribute("class","inputSelectForm");
    newSelect.name = "busquedaxID";
    newSelect.addEventListener("change", findRecordsxId);

    contenedor.appendChild(newSelect);

    inicializarSearchxID();
}

export function onSearchInputName(){
    const inputNameSearch = document.getElementById("inputSearchNombre");
    inputNameSearch.addEventListener("input", function(event){
        const findItem = event.target.value;
        
        const miTabla = document.getElementById("resultado-libros");
        miTabla.innerHTML = "";
            
        const librosFiltrados = arregloBiblioteca.obtenerRegistros().filter((infoLibro) => {
            if( infoLibro.nombre.includes(findItem) )
                return true;
            else
                return false;
        });

        librosFiltrados.forEach((elemento) => {
            const libro = {
                idLibro: elemento.id,
                tipoLibro: elemento.tipo,
                nombreLibro: elemento.nombre,
                annoLibro: elemento.anno,
                numLibros: elemento.cantidad
            };
            addNewRecord(libro);
        });
    });
}

export function onSubmitRequest(formId){
    const formNewLibro = document.getElementById(formId);

    formNewLibro.addEventListener("submit", function(evento) {
        evento.preventDefault();

        camposFormulario.id = false;
        camposFormulario.tipo = false;
        camposFormulario.nombre = false;
        camposFormulario.anno = false;
        camposFormulario.cantidad = false;
    
        const infoNewLibro = new FormData(evento.target);
    
        let infoLibro = infoNewLibro.entries();
        infoLibro = Object.fromEntries(infoLibro);
    
        const { idLibro, tipoLibro, nombreLibro, annoLibro, numLibros } = infoLibro;

        /* Validacion campo ID */
        camposFormulario.id = validateIDValue(idLibro);
        if( !validateFormInputs(camposFormulario.id, "idLibro", "id_error", respuestas_globales.id_formato, variables_globales.error_timeout) )
            return false;
        
        camposFormulario.id = !existeIdRegistrado(idLibro);
        if( !validateFormInputs(camposFormulario.id, "idLibro", "id_duplicado", respuestas_globales.id_duplicado, variables_globales.error_timeout) )
            return false;

        camposFormulario.tipo = tipoLibro === "" ? false : true;
        camposFormulario.nombre = validateEmptyValue(nombreLibro);
        camposFormulario.anno = validateEmptyValue(annoLibro);
        camposFormulario.cantidad = validateEmptyValue(numLibros);

        /* Validacion campo tipo de libro */
        if( !validateFormInputs(camposFormulario.tipo, "tipoLibro", "tipo_error", respuestas_globales.tipo_incorrecto, variables_globales.error_timeout) )
            return false;

        /* Validacion campo nombre de libro */
        if( !validateFormInputs(camposFormulario.nombre, "nombreLibro", "nombre_error", respuestas_globales.nombre_incorrecto, variables_globales.error_timeout) )
            return false;


        /* Validacion campo año del libro */
        if( !validateFormInputs(camposFormulario.anno, "annoLibro", "anno_error", respuestas_globales.anno_incorrecto, variables_globales.error_timeout) )
            return false;
        
        camposFormulario.anno = validaRangeValue(annoLibro, variables_globales.anno_minimo, variables_globales.anno_maximo);
        if( !validateFormInputs(camposFormulario.anno, "annoLibro", "anno_error", respuestas_globales.anno_fuera_rango, variables_globales.error_timeout) )
            return false;
    

        /* Validacion campo cantidad de libros */
        if( !validateFormInputs(camposFormulario.cantidad, "numLibros", "cantidad_error", respuestas_globales.cantidad_incorrecta, variables_globales.error_timeout) )
            return false;

        camposFormulario.cantidad = validaRangeValue(numLibros, variables_globales.cantidad_minima, variables_globales.cantidad_maxima);
        if( !validateFormInputs(camposFormulario.cantidad, "numLibros", "cantidad_error", respuestas_globales.cantidad_fuera_rango, variables_globales.error_timeout) )
            return false;

        /* Validacion final antes del registro */
        if( camposFormulario.id && camposFormulario.tipo && camposFormulario.nombre && camposFormulario.anno && camposFormulario.cantidad ){
            switch(tipoLibro){
                case "Computación":
                    const libroComputacion = new Computacion(
                        idLibro,
                        tipoLibro,
                        nombreLibro,
                        annoLibro,
                        numLibros
                    );
                    arregloBiblioteca.agregarRegistro(libroComputacion);
                    break;
                case "Matemáticas":
                    const libroMatematicas = new Matematicas(
                        idLibro,
                        tipoLibro,
                        nombreLibro,
                        annoLibro,
                        numLibros
                    );
                    arregloBiblioteca.agregarRegistro(libroMatematicas);                
                    break;
                case "Psicología":
                    const libroPsicologia = new Psicologia(
                        idLibro,
                        tipoLibro,
                        nombreLibro,
                        annoLibro,
                        numLibros
                    );
                    arregloBiblioteca.agregarRegistro(libroPsicologia);
                    break;
                case "Literatura":
                    const libroLiteratura = new Literatura(
                        idLibro,
                        tipoLibro,
                        nombreLibro,
                        annoLibro,
                        numLibros
                    );
                    arregloBiblioteca.agregarRegistro(libroLiteratura);
                    break;
                default:
                    break;
            }

            addNewRecord(infoLibro);
            addNewSelectFilter(idLibro);

            showInformacionGeneral();
            updateDatalistObjects();

            cleanFormData();

            showRegistroExistoso( respuestas_globales.ingreso_exitoso, variables_globales.registro_exitoso_timeout);
            return true;
        }
        else {
            return false;
        }
    });
}

export function onReniciarWeb(buttonElement, idTablaRegistros, idSearchxID){
    const buttonReset = document.getElementById(buttonElement);

    buttonReset.addEventListener("click", function(evento){
        evento.preventDefault();
        
        const tablaRegistros = document.getElementById("resultado-libros");

        if(tablaRegistros){
            tablaRegistros.innerHTML = "";
        }

        const searchItemxID = document.getElementById(idSearchxID);
        searchItemxID.innerHTML = "";

        document.getElementById("listado").innerHTML = "";
        document.getElementById("inputSearchNombre").value = "";
        arregloBiblioteca.limpiarRegistros();

        cleanFormData();
        showInformacionGeneral();
        inicializarSearchxID();
        return;
    });
}
