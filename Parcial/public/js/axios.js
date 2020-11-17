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
        .finally(() => {
        });
}



export function clickListarAxios() {
    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";

    axios.get('http://localhost:3000/Anuncios')
        .then(res => {
            divTabla.appendChild(crearTabla(res.data));
            console.log("datos mostrados", res.data);
        })
        .catch(err => {
            console.error(err.response.status, err.response.statusText);
        })
        .finally(() => {
            divTabla.style.display = "block";
            document.getElementById('containerSpinner').style.display = "none";
        });
}




export function clickAltaAxios(e) {
    e.preventDefault();
    const nuevoAuto = obtenerAnuncio();

    delete nuevoAuto.id;

    //console.log(nuevoAuto);

    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";
    const config = {
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        data: JSON.stringify(nuevoAuto)
    }

    axios('http://localhost:3000/Anuncios', config)
        .then(res => {
           //console.log("alta exitososa ", res.data);
            clickListarAxios();
        })
        .catch(err => {
            console.error(err.response.status, err.response.statusText);
        })
        .finally(() => {
            limpiarFormulario();
            divTabla.style.display = "block";
            document.getElementById('containerSpinner').style.display = "none";
            document.getElementById('btnBorrar').style.display = "none";
            document.getElementById('btnModificar').style.display = "none";
        });
}

export function clickModificarAxios(){
    
    const anuncioAModificar = obtenerAnuncio();
    let id = anuncioAModificar.id;
    delete anuncioAModificar.id;

    divTabla.innerHTML = "";
    document.getElementById('containerSpinner').style.display = "block";

    const config={
        method:"PUT",
        headers:{
            "Content-type": "application/json;charset=utf-8"
        },
        data:JSON.stringify(anuncioAModificar)
    }

    axios('http://localhost:3000/Anuncios/'+id, config)
    .then(res=>{
        //console.log("modificacion exitososa ", res.data);
        clickListarAxios();
    })
    .catch(err=>{
        console.error(err.response.status ,  err.response.statusText);
    })
    .finally(()=>{
        limpiarFormulario();
        divTabla.style.display = "block";
        document.getElementById('containerSpinner').style.display = "none";
        document.getElementById('btnBorrar').style.display = "none";
        document.getElementById('btnModificar').style.display = "none";
    });
}

export function clickBajaAxios(){
    
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

    axios('http://localhost:3000/Anuncios/'+id, config)
    .then(res=>{
        //console.log("eliminacion exitososa ", res.data);
        clickListarAxios();
    })
    .catch(err=>{
        console.error(err.response.status ,  err.response.statusText);
    })
    .finally(()=>{
        limpiarFormulario();
        divTabla.style.display = "block";
        document.getElementById('containerSpinner').style.display = "none";
        document.getElementById('btnBorrar').style.display = "none";
        document.getElementById('btnModificar').style.display = "none";
    });
}