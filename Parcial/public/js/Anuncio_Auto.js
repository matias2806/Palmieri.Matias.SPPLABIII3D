import {
    Anuncio
} from './Anuncio.js';

export class Anuncio_Auto extends Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio, puertas, kms, potencia) {
        super(id, titulo, transaccion, descripcion, precio);
        this.puertas = puertas;
        this.kms = kms;
        this.potencia = potencia;
    }


    // Alta persona, baja modificar etc ...

}

//Funciones del manejo del local storage
//obtenerPersonas
export function obtenerAnuncios() {
    return JSON.parse(localStorage.getItem('anuncios')) || [];
}
export function obtenerId() {
    return JSON.parse(localStorage.getItem('nextId')) || 20000;
}
export function guardarDatos(listaPersonas, proximoId) {
    localStorage.setItem('anuncios', JSON.stringify(listaPersonas));
    localStorage.setItem('nextId', proximoId);
}

//eliminarPersona
export function eliminarAnuncio() {
    const idPerABorrar = JSON.parse(localStorage.getItem('idSeleccionado'));
    const listado = JSON.parse(localStorage.getItem('anuncios'));

    // console.log(listado);
    let resp = confirm('Esta seguro que desea continuar ?');
    if (resp == true) {
        let i = 0;
        listado.forEach(element => {
            if (element['id'] == idPerABorrar) {
                // console.log('aca esta',element);
                listado.splice(i, 1);
                i++;
            }
            i++;
        });
        // console.log(listado);

        localStorage.setItem('anuncios', JSON.stringify(listado));
    } else {
        alert("La operacion fue cancelada")
    }
}



//Metodos para editar / Borrrar
//editarPersona
export function editarAnuncio() {
    const idAModificar = JSON.parse(localStorage.getItem('idSeleccionado'));
    const listado = JSON.parse(localStorage.getItem('anuncios'));
    let resp = confirm('Esta seguro que desea continuar ?');
    if (resp == true) {
        let i = 0;
        listado.forEach(element => {
            if (element['id'] == idAModificar) {
                // console.log('aca esta', element);
                element['titulo'] = document.getElementById('txtTitulo').value;
                element['transaccion'] = document.querySelector('#txtTransaccion').value;
                element['descripcion'] =  document.getElementById('txtDescripcion').value;
                element['precio'] = document.getElementById('txtPrecio').value;
                element['puertas'] = document.getElementById('txtPuertas').value;
                element['kms'] =  document.getElementById('txtKms').value;
                element['potencia'] =  document.getElementById('txtPotencia').value;

                i++;
            }
            i++;
        });
        // console.log(listado);
        localStorage.setItem('anuncios', JSON.stringify(listado));
    } else {
        alert("La operacion fue cancelada");
    }
}