import crearTabla from './tabla.js';
import {
    obtenerAnuncio,
    limpiarFormulario,
    llevaData
} from './script.js';
import {promedioDePrecios} from './filtros.js';

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



export async function clickListarFetchAsyncConReturn() {

    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";

    try {
        let res = await fetch('http://localhost:3000/Anuncios');
        if (!res.ok) throw {
            status: res.status,
            statusText: res.statusText || "No definido"
        };
        let data = await res.json();
        divTabla.appendChild(crearTabla(data));
        console.log("datos mostrados con fetch Async", data);
    } catch (err) {
        console.error(err.status);
    } finally {
        divTabla.style.display = "block";
        document.getElementById('containerSpinner').style.display = "none";
    }
    return data;
}

export async function clickListarFetchAsync() {

    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";
    let retorno ="";

    try {
        let res = await fetch('http://localhost:3000/Anuncios');
        if (!res.ok) throw {
            status: res.status,
            statusText: res.statusText || "No definido"
        };
        let data = await res.json();
        divTabla.appendChild(crearTabla(data));
        console.log("datos mostrados con fetch Async", data);
        llevaData(data);
        promedioDePrecios(data);
    } catch (err) {
        console.error(err.status);
    } finally {
        divTabla.style.display = "block";
        document.getElementById('containerSpinner').style.display = "none";
        
    }
    return retorno;
}
export async function clickAltaFetchAsync(e) {
    e.preventDefault();
    const nuevoAnuncio = obtenerAnuncio();
    delete nuevoAnuncio.id;

    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";
    const config = {
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(nuevoAnuncio)
    }

    try {
        let res = await fetch('http://localhost:3000/Anuncios', config);
        if (!res.ok) throw {
            status: res.status,
            statusText: res.statusText || "No definido"
        };
        let data = await res.json();
        console.log("alta exitososa con Fetch Async ", data);
        clickListarFetchAsync();
    } catch (err) {
        console.error(err.status);
    } finally {
        limpiarFormulario();
        divTabla.style.display = "block";
        document.getElementById('containerSpinner').style.display = "none";
        document.getElementById('btnBorrar').style.display = "none";
        document.getElementById('btnModificar').style.display = "none";
    }
}
export async function clickModificarFetchAsync() {

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

    try {
        let res = await fetch('http://localhost:3000/Anuncios/' + id, config);
        if (!res.ok) throw {
            status: res.status,
            statusText: res.statusText || "No definido"
        };
        let data = await res.json();
        console.log("modificacion exitososa con fetch Async", data);
        clickListarFetchAsync();
    } catch (err) {
        console.error(err.status);
    } finally {
        limpiarFormulario();
        divTabla.style.display = "block";
        document.getElementById('containerSpinner').style.display = "none";
        document.getElementById('btnBorrar').style.display = "none";
        document.getElementById('btnModificar').style.display = "none";
    }
}

export async function clickBajaFetchAsync() {
    const anuncioABorrar = obtenerAnuncio();
    let id = anuncioABorrar.id;
    delete anuncioABorrar.id;

    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";

    const config = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        }
    }

    try {
        let res = await  fetch('http://localhost:3000/Anuncios/' + id, config);
        if (!res.ok) throw {
            status: res.status,
            statusText: res.statusText || "No definido"
        };
        let data = await res.json();
        console.log("eliminacion exitososa con fetch Async", data);
        clickListarFetchAsync();
    } catch (err) {
        console.error(err.status);
    }finally{
        limpiarFormulario();
        divTabla.style.display = "block";
        document.getElementById('containerSpinner').style.display = "none";
        document.getElementById('btnBorrar').style.display = "none";
        document.getElementById('btnModificar').style.display = "none";
    }
}