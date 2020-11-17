import {
    Persona
} from './persona.js';

export class PersonaCompleta extends Persona {
    constructor(id, nombre, apellido, email, sexo, fecha, deporte, fumador) {
        super(id, nombre, apellido, email, sexo);
        this.fecha = fecha;
        this.deporte = deporte;
        this.fumador = fumador;
    }


    // Alta persona, baja modificar etc ...

}

//Funciones del manejo del local storage
export function obtenerPersonas() {
    return JSON.parse(localStorage.getItem('gente')) || [];
}
export function obtenerId() {
    return JSON.parse(localStorage.getItem('nextId')) || 20000;
}
export function guardarDatos(listaPersonas, proximoId) {
    localStorage.setItem('gente', JSON.stringify(listaPersonas));
    localStorage.setItem('nextId', proximoId);
}


export function eliminarPersona() {
    const idPerABorrar = JSON.parse(localStorage.getItem('idPersonaSeleccionada'));
    const listadoPersonas = JSON.parse(localStorage.getItem('gente'));

    // console.log(listadoPersonas);
    let resp = confirm('Esta seguro que desea continuar ?');
    if (resp == true) {
        let i = 0;
        listadoPersonas.forEach(element => {
            if (element['id'] == idPerABorrar) {
                // console.log('aca esta',element);
                listadoPersonas.splice(i, 1);
                i++;
            }
            i++;
        });
        // console.log(listadoPersonas);

        localStorage.setItem('gente', JSON.stringify(listadoPersonas));
    } else {
        alert("La operacion fue cancelada")
    }
}



//Metodos para editar / Borrrar
export function editarPersona() {
    const idPerAModificar = JSON.parse(localStorage.getItem('idPersonaSeleccionada'));
    const listadoPersonas = JSON.parse(localStorage.getItem('gente'));
    let resp = confirm('Esta seguro que desea continuar ?');
    if (resp == true) {
        let i = 0;
        listadoPersonas.forEach(element => {
            if (element['id'] == idPerAModificar) {
                // console.log('aca esta', element);
                element['nombre'] = document.forms[0].nombre.value;
                element['apellido'] = document.getElementById('txtApellido').value;
                element['email'] = document.getElementById('txtEmail').value;
                element['sexo'] = document.forms[0].gender.value;
                element['fecha'] = document.getElementById('dia').value,
                    element['deporte'] = document.getElementById('deporte').value,
                    element['fumador'] = document.getElementById('checkFuma').checked

                i++;
            }
            i++;
        });
        // console.log(listadoPersonas);
        localStorage.setItem('gente', JSON.stringify(listadoPersonas));
    } else {
        alert("La operacion fue cancelada");
    }
}