import crearTabla from './tabla.js';
import {
    obtenerAnuncio,
    limpiarFormulario
} from './script.js';


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

export function buscarAnuncio(id) {
    fetch('http://localhost:3000/Anuncios/' + id)
        .then(res => {
            cargarFormulario(res.data['id'], res.data['titulo'], res.data['transaccion'], res.data['descripcion'], res.data['precio'], res.data['puertas'], res.data['kms'], res.data['potencia']);
        })
        .catch(err => {
            console.error(err.response.status, err.response.statusText);
        })
}



export function clickListarXhr() {
    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {

                let data = JSON.parse(xhr.responseText);

                divTabla.appendChild(crearTabla(data));
                console.log("datos mostrados con XHR", data);
            } else {
                console.log("Error: " + xhr.status + " - " + xhr.statusText);
            }
            divTabla.style.display = "block";
            document.getElementById('containerSpinner').style.display = "none";
        }
    });
    xhr.open("GET", "http://localhost:3000/Anuncios");
    xhr.send();
}

export function clickAltaXhr(e) {
    e.preventDefault();
    const nuevoAnuncio = obtenerAnuncio();

    delete nuevoAnuncio.id;
    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {

                let datos = JSON.parse(xhr.responseText);
                console.log("alta exitososa con XHR ", datos);
                clickListarXhr();

            } else {
                console.log("Error: " + xhr.status + " - " + xhr.statusText);
            }
            limpiarFormulario();
            divTabla.style.display = "block";
            document.getElementById('containerSpinner').style.display = "none";
            document.getElementById('btnBorrar').style.display = "none";
            document.getElementById('btnModificar').style.display = "none";
        }
    });
    xhr.open("POST", "http://localhost:3000/Anuncios");
    xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(nuevoAnuncio));
}
export function clickModificarXhr() {

    const anuncioAModificar = obtenerAnuncio();
    let id = anuncioAModificar.id;
    delete anuncioAModificar.id;

    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {

                let datos = JSON.parse(xhr.responseText);
                console.log("modificacion exitososa con XHR ", datos);
                clickListarXhr();

            } else {
                console.log("Error: " + xhr.status + " - " + xhr.statusText);
            }
            limpiarFormulario();
            divTabla.style.display = "block";
            document.getElementById('containerSpinner').style.display = "none";
            document.getElementById('btnBorrar').style.display = "none";
            document.getElementById('btnModificar').style.display = "none";
        }
    });
    xhr.open("PUT", "http://localhost:3000/Anuncios/" + id);
    xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(anuncioAModificar));
}

export function clickBajaXhr() {
    const anuncioABorrar = obtenerAnuncio();
    let id = anuncioABorrar.id;
    delete anuncioABorrar.id;

    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {

                let datos = JSON.parse(xhr.responseText);
                console.log("eliminacion exitososa con XHR ", datos);
                clickListarXhr();

            } else {
                console.log("Error: " + xhr.status + " - " + xhr.statusText);
            }
            limpiarFormulario();
            divTabla.style.display = "block";
            document.getElementById('containerSpinner').style.display = "none";
            document.getElementById('btnBorrar').style.display = "none";
            document.getElementById('btnModificar').style.display = "none";
        }
    });
    xhr.open("DELETE", "http://localhost:3000/Anuncios/" + id);
    xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
    xhr.send();
}