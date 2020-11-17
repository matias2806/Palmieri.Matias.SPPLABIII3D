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
    axios.get('http://localhost:3000/Anuncios/' + id)
        .then(res => {
            cargarFormulario(res.data['id'], res.data['titulo'], res.data['transaccion'], res.data['descripcion'], res.data['precio'], res.data['puertas'], res.data['kms'], res.data['potencia']);
        })
        .catch(err => {
            console.error(err.response.status, err.response.statusText);
        })
        .finally(() => {});
}



export async function clickListarAxiosAsync() {
    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";

    try {
        let res = await axios.get('http://localhost:3000/Anuncios');
        divTabla.appendChild(crearTabla(res.data));
        console.log("datos mostrados con Axios Async", res.data);
    } catch (err) {
        console.error(err.response.status, err.response.statusText);
    } finally {
        divTabla.style.display = "block";
        document.getElementById('containerSpinner').style.display = "none";
    }
}




export async function clickAltaAxiosAsync(e) {
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
        data: JSON.stringify(nuevoAnuncio)
    }

    try {
        let res = await axios('http://localhost:3000/Anuncios', config);
        console.log("alta exitososa con axios Async", res.data);
        clickListarAxiosAsync();
    } catch (err) {
        console.log(err.response.status, err.response.statusText);
    } finally {
        limpiarFormulario();
        divTabla.style.display = "block";
        document.getElementById('containerSpinner').style.display = "none";
        document.getElementById('btnBorrar').style.display = "none";
        document.getElementById('btnModificar').style.display = "none";
    }
}

export async function clickModificarAxiosAsync() {

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
        data: JSON.stringify(anuncioAModificar)
    }

    try {
        let res = await axios('http://localhost:3000/Anuncios/' + id, config)
        console.log("modificacion exitososa con Axios Async", res.data);
        clickListarAxiosAsync();
    } catch (err) {
        console.error(err.response.status, err.response.statusText);
    } finally {
        limpiarFormulario();
        divTabla.style.display = "block";
        document.getElementById('containerSpinner').style.display = "none";
        document.getElementById('btnBorrar').style.display = "none";
        document.getElementById('btnModificar').style.display = "none";
    }
}

export async function clickBajaAxiosAsync() {

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
        let res = await axios('http://localhost:3000/Anuncios/' + id, config);
        console.log("eliminacion exitososa con Axios Async", res.data);
        clickListarAxiosAsync();
    } catch (err) {
        console.error(err.response.status, err.response.statusText);
    }finally{
        limpiarFormulario();
        divTabla.style.display = "block";
        document.getElementById('containerSpinner').style.display = "none";
        document.getElementById('btnBorrar').style.display = "none";
        document.getElementById('btnModificar').style.display = "none";
    }
}