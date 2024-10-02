import { showInformacionGeneral } from "./funciones.js";
import { onSubmitRequest, onReniciarWeb, onSearchInputName } from "./eventos.js";

showInformacionGeneral();
onSearchInputName();
onSubmitRequest("formulario-registro");
onReniciarWeb("reset-btn", "libros-registrados", "inputSearchID");