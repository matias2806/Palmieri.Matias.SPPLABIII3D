import crearTabla from './tabla.js';
import {
    obtenerAnuncio,
    limpiarFormulario
} from './script.js';
import {clickListarFetchAsync} from './fetchAsync.js';


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



export function clickListarFetch() {

    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";

    fetch('http://localhost:3000/Anuncios')
        .then(res => {
            if (!res.ok) return Promise.reject(res);
            return res.json();
        })
        .then(data => {
            divTabla.appendChild(crearTabla(data));
            console.log("datos mostrados con fetch", data);
        })
        .catch(err => {
            console.error(err.status);
        })
        .finally(() => {
            divTabla.style.display = "block";
            document.getElementById('containerSpinner').style.display = "none";
        });
}
export function clickAltaFetch(e) {
    e.preventDefault();
    const nuevoAnuncio = obtenerAnuncio();

    delete nuevoAnuncio.id;

    //console.log(nuevoAnuncio);

    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";
    const config = {
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(nuevoAnuncio)
    }

    fetch('http://localhost:3000/Anuncios', config)
        .then(res => {
            if (!res.ok) return Promise.reject(res);
            return res.json();
        })
        .then(anuncioAgregado => {
            console.log("alta exitososa con fetch ", anuncioAgregado);
            clickListarFetchAsync();
        })
        .catch(err => {
            console.error(err.status);
        })
        .finally(() => {
            limpiarFormulario();
            divTabla.style.display = "block";
            document.getElementById('containerSpinner').style.display = "none";
            document.getElementById('btnBorrar').style.display = "none";
            document.getElementById('btnModificar').style.display = "none";
        });
}
export function clickModificarFetch() {

    const anuncioAModificar = obtenerAnuncio();
    let id = anuncioAModificar.id;
    delete anuncioAModificar.id;

    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";

    const config = {
        method: "PUT",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(anuncioAModificar)
    }

    fetch('http://localhost:3000/Anuncios/' + id, config)
        .then(res => {
            if (!res.ok) return Promise.reject(res);
            return res.json();
        })
        .then(personaModificada => {
            console.log("modificacion exitososa con fetch ", personaModificada);
            clickListarFetchAsync();
        })
        .catch(err => {
            console.error(err.status);
        })
        .finally(() => {
            limpiarFormulario();
            divTabla.style.display = "block";
            document.getElementById('containerSpinner').style.display = "none";
            document.getElementById('btnBorrar').style.display = "none";
            document.getElementById('btnModificar').style.display = "none";
        });
}

export function clickBajaFetch() {
    const anuncioABorrar = obtenerAnuncio();
    let id = anuncioABorrar.id;
    delete anuncioABorrar.id;

    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";

    const config={
        method:"DELETE",
        headers:{
            "Content-type": "application/json;charset=utf-8"
        }
    }

    fetch('http://localhost:3000/Anuncios/'+id, config)
    .then(res=>{
        if(!res.ok) return Promise.reject(res);
        return res.json();
    })
    .then(personaBorrada=>{
        console.log("eliminacion exitososa con fetch ", personaBorrada);
        clickListarFetchAsync();
    })
    .catch(err=>{
        console.error(err.status);
    })
    .finally(()=>{
        limpiarFormulario();
        divTabla.style.display = "block";
        document.getElementById('containerSpinner').style.display = "none";
        document.getElementById('btnBorrar').style.display = "none";
        document.getElementById('btnModificar').style.display = "none";
    });

}