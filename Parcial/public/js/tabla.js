import {
    buscarAnuncio
} from './axios.js';

let cantFilas;
//Metodos dedicados a la creacion de la tabla
export default function crearTabla(lista) {
    const tabla = document.createElement('table');
    tabla.className += "table table-bordered table-striped table-dark table-hover";
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));

    return tabla;
}

function crearCabecera(item) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (const key in item) {
        const th = document.createElement('th');
        const texto = document.createTextNode(key);
        th.appendChild(texto);
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
}

function crearCuerpo(lista) {
    const tbody = document.createElement('tbody');

    lista.forEach(element => {

        const tr = document.createElement('tr');

        for (const key in element) {
            const td = document.createElement('td');
            const texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            tr.appendChild(td);
        }

        if (element.hasOwnProperty('id')) {
            tr.setAttribute('data-id', element['id']);
            tr.setAttribute('data-lastNombre', element['last_name']);
            // tr.dataset.id = element['id'];
        }

        agregarManejadorTR(tr);
        tbody.appendChild(tr);
    });

    return tbody;
}


//Agrega el click a los TR
function agregarManejadorTR(tr) {
    if (tr) {
        if (cantFilas == null) {
            cantFilas = 1;
        }
        if (cantFilas % 2 == 0) {

        } else {
            // tr.setAttribute('style','background-color:aquamarine;');
        }
        cantFilas++;

        tr.addEventListener('click', function (e) {

            //alert( e.path[1].dataset.id); //<---id
            const idPersonaSeleccionada = e.path[1].dataset.id;
            
            //buscarAnuncio(idPersonaSeleccionada); //Este busca por metodo fetch etc
            buscarAnuncioDeLaTabla(e.path[1]); //este leo de la tabla

            //cargarFormulario(id, titulo , transaccion, descripcion, precio, puertas, kms, potencia);
            //localStorage.setItem('idSeleccionado',idPersonaSeleccionada);

            document.getElementById('btnModificar').style.display = "inline-block";
            document.getElementById('btnBorrar').style.display = "inline-block";


        });
    }
}



function buscarAnuncioDeLaTabla(tr) {
    var titulo = tr.getElementsByTagName("td")[0];
    var transaccion = tr.getElementsByTagName("td")[1];
    var descripcion = tr.getElementsByTagName("td")[2];
    var precio = tr.getElementsByTagName("td")[3];
    var puertas = tr.getElementsByTagName("td")[4];
    var kms = tr.getElementsByTagName("td")[5];
    var potencia = tr.getElementsByTagName("td")[6];
    var id = tr.getElementsByTagName("td")[7];
    cargarFormulario(id.innerHTML, titulo.innerHTML, transaccion.innerHTML, descripcion.innerHTML, precio.innerHTML, puertas.innerHTML, kms.innerHTML, potencia.innerHTML);
}


//Metodos para buscar una persona / cargar un formulario
// function buscarPersona(idPer){
//     const listado = JSON.parse(localStorage.getItem('anuncios'));

//     if(listado != null ){
//         listado.forEach(element => {
//             if(element['id'] == idPer){
//                 cargarFormulario(element['titulo'],element['transaccion'],element['descripcion'],element['precio']
//                 ,element['puertas'],element['kms'],element['potencia']);
//             }
//         });
//     }
// }

function cargarFormulario(id, titulo, transaccion, descripcion, precio, puertas, kms, potencia) {
    document.getElementById('txtId').value = id;
    document.getElementById('txtTitulo').value = titulo;
    document.querySelector('#txtTransaccion').value = transaccion;
    document.getElementById('txtDescripcion').value = descripcion;
    document.getElementById('txtPrecio').value = precio;
    document.getElementById('txtPuertas').value = puertas;
    document.getElementById('txtKms').value = kms;
    document.getElementById('txtPotencia').value = potencia;
}