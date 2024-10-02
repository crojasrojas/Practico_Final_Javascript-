import { arregloBiblioteca } from "./clases.js";
import { expresiones_regulares } from "./globales.js"

export function inicializarSearchxID(){
    const filterIds = document.getElementById("inputSearchID");

    const initFilterOptionInicial = document.createElement("option");
    initFilterOptionInicial.value = "";
    initFilterOptionInicial.textContent = "(seleccione identificador de libro)";
    initFilterOptionInicial.setAttribute("class", "option_placeholder");
    initFilterOptionInicial.selected = true;

    const initFilterOptionTodos = document.createElement("option");
    initFilterOptionTodos.value = "Todos";
    initFilterOptionTodos.textContent = "Todos";

    filterIds.appendChild(initFilterOptionInicial);
    filterIds.appendChild(initFilterOptionTodos);
}

export function showInformacionGeneral(){
    const labelNombreBiblioteca = document.getElementById("nombreBiblioteca");
    const labelRegistrosBiblioteca = document.getElementById("totalLibros");

    labelNombreBiblioteca.innerHTML = arregloBiblioteca.getNombreBiblioteca();
    labelRegistrosBiblioteca.innerHTML = arregloBiblioteca.getRecords() + " registros";
}

export function cleanFormData(){
    document.getElementById("formulario-registro").reset();
}

export function addNewRecord(objLibro) {
    const miTabla = document.getElementById("resultado-libros");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `<td>${objLibro.idLibro}</td>
                        <td>${objLibro.tipoLibro}</td>
                        <td>${objLibro.nombreLibro}</td>
                        <td>${objLibro.annoLibro}</td>
                        <td>${objLibro.numLibros}</td>`;

    miTabla.appendChild(newRow);
}

export function addNewSelectFilter(itemValue){
    const selectItem = document.getElementById("inputSearchID");

    const newOption = document.createElement("option");
    newOption.value = itemValue;
    newOption.textContent = itemValue;
  
    selectItem.appendChild(newOption);
}

export function validateIDValue(value){
    if(isNaN(value))
        return false;

    if(!expresiones_regulares.id.test(value))
        return false;

    return true;
}

export function existeIdRegistrado(inputId){
    return arregloBiblioteca.obtenerRegistros().some((infoLibro) => infoLibro.id === inputId );
}

export function validateEmptyValue(value){
    if(!value)
        return false;

    if(value.length < 1)
        return false;

    return true;
}

export function validaRangeValue(numericValue, minValue, maxValue){
    if(isNaN(numericValue))
        return false;

    if( parseInt(numericValue) >= minValue && parseInt(numericValue) <= maxValue )
        return true;
    else
        return false;
}

export function showRegistroExistoso(mensaje, timeout){
    const contenedor = document.getElementById("contenedor-popup");
    const textmsg = document.getElementById("txt-popup");

    textmsg.innerText = mensaje;
    contenedor.style.display = "block";

    setTimeout(() => {
        textmsg.innerText = "";
        contenedor.style.display = "none";
    }, timeout);
}

export function showErroMessage(idObjeto, idErrorObjecto, errorMessage, errorTimeOut){
    document.getElementById(idObjeto).classList.add("error"); 
    document.getElementById(idErrorObjecto).classList.add("formulario_input_error_activado");
    document.getElementById(idErrorObjecto).innerHTML = errorMessage;

    setTimeout(() => {
        document.getElementById(idObjeto).classList.remove("error"); 
        document.getElementById(idErrorObjecto).classList.remove('formulario_input_error_activado');
    }, errorTimeOut);

    document.getElementById(idObjeto).focus();
}

export function hideErrorMessage(idObjeto, idErrorObjecto){
    document.getElementById(idObjeto).classList.remove("error");
    document.getElementById(idErrorObjecto).classList.remove('formulario_input_error_activado');
}

export function validateFormInputs(resultValue, idFormInput, idFormErrorMessage, errorMessage, timeout){
    if(resultValue){
        hideErrorMessage(idFormInput, idFormErrorMessage);
        return true;
    }
    else{
        showErroMessage(idFormInput, idFormErrorMessage, errorMessage, timeout);
        return false;
    }
}

export function findRecordsxId(evento){
    const findItem = evento.target.value;
    const miTabla = document.getElementById("resultado-libros");
    miTabla.innerHTML = "";

    let librosRegistrados = [];

    if( findItem === "Todos" || findItem === "" ){
        librosRegistrados = arregloBiblioteca.obtenerRegistros();
    }
    else{
        librosRegistrados = arregloBiblioteca.obtenerRegistros().filter((objLibro) => {
            if(objLibro.id === findItem){
                return true;
            }
        })
    }

    librosRegistrados.forEach((elemento) => {
        const libro = {
            idLibro: elemento.id,
            tipoLibro: elemento.tipo,
            nombreLibro: elemento.nombre,
            annoLibro: elemento.anno,
            numLibros: elemento.cantidad
        };

        addNewRecord(libro);
    });
}

export function updateDatalistObjects(){
    const listadoNombre = document.getElementById("listado");
    listadoNombre.innerHTML = "";

    const nombres = arregloBiblioteca.obtenerRegistros().map((objLibro) => {
        return objLibro.nombre;
    });

    const nombresSet = new Set(nombres);
    const nombresUnicos = [...nombresSet];

    console.log(nombresUnicos);

    nombresUnicos.forEach((nombre) => {
        const optionNombreFind = document.createElement("option");
        optionNombreFind.value = nombre;
        optionNombreFind.textContent = nombre;

        listadoNombre.appendChild(optionNombreFind);
    });
}