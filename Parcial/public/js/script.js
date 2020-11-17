import crearTabla from './tabla.js';

import {
    Anuncio_Auto,
    obtenerAnuncios,
    obtenerId,
    guardarDatos,
    eliminarAnuncio,
    editarAnuncio
} from './Anuncio_Auto.js';

import {
    filtro,
    filtroSexo,
    mapNumerosCuadrado,
    filtraCampos,
    filtraCampos2,
    reduceSumaEdades,
    filtroTransaccion,
    filtroTablaTitulo
} from './filtros.js';

import {
    clickListarAxios,
    clickAltaAxios,
    clickModificarAxios,
    clickBajaAxios
} from './axios.js';

import {
    clickListarAxiosAsync,
    clickAltaAxiosAsync,
    clickModificarAxiosAsync,
    clickBajaAxiosAsync
} from './axiosAsync.js';
import {
    clickListarFetch,
    clickAltaFetch,
    clickModificarFetch,
    clickBajaFetch
} from './fetch.js';
import {
    clickListarXhr,
    clickAltaXhr,
    clickModificarXhr,
    clickBajaXhr
} from './xhr.js';
import {
    clickListarFetchAsync,
    clickAltaFetchAsync,
    clickModificarFetchAsync,
    clickBajaFetchAsync,
    clickListarFetchAsyncConReturn
} from './fetchAsync.js';

let frmPersona;
let divTabla;
let arrayAnuncios;
let copiaArrayAnuncios;

window.addEventListener('load', () => {
    document.getElementById("txtPrecioFilter").value = "N/A";
    frmPersona = document.forms[0];
    // document.forms[0].btnCargar.addEventListener('click', cargar);
    //document.forms[0].btnCargar.addEventListener('click', reduceSumaEdades);


    divTabla = document.getElementById('divTabla');

    //LocalStorage
    //frmPersona.addEventListener('submit', clickAlta);
    //document.forms[0].listar.addEventListener('click', clickListar);
    //document.forms[0].btnModificar.addEventListener('click', clickModificar);
    //document.forms[0].btnBorrar.addEventListener('click', clickEliminar);

    //Axios
    // document.forms[0].listar.addEventListener('click', clickListarAxios);
    // frmPersona.addEventListener('submit', clickAltaAxios);
    // document.forms[0].btnModificar.addEventListener('click', clickModificarAxios);
    // document.forms[0].btnBorrar.addEventListener('click', clickBajaAxios);

    //Fetch
    // document.forms[0].listar.addEventListener('click', clickListarFetch);
     frmPersona.addEventListener('submit', clickAltaFetch);
     document.forms[0].btnModificar.addEventListener('click', clickModificarFetch);
     document.forms[0].btnBorrar.addEventListener('click', clickBajaFetch);

    //Xhr
    // document.forms[0].listar.addEventListener('click', clickListarXhr);
    // frmPersona.addEventListener('submit', clickAltaXhr);
    // document.forms[0].btnModificar.addEventListener('click', clickModificarXhr);
    // document.forms[0].btnBorrar.addEventListener('click', clickBajaXhr);

    //AxiosAsync
    // document.forms[0].listar.addEventListener('click', clickListarAxiosAsync);
    // frmPersona.addEventListener('submit', clickAltaAxiosAsync);
    // document.forms[0].btnModificar.addEventListener('click', clickModificarAxiosAsync);
    // document.forms[0].btnBorrar.addEventListener('click', clickBajaAxiosAsync);

    //FetchAsync
    document.forms[0].listar.addEventListener('click', clickListarFetchAsync);
    //frmPersona.addEventListener('submit', clickAltaFetchAsync);
    //document.forms[0].btnModificar.addEventListener('click', clickModificarFetchAsync);
    //document.forms[0].btnBorrar.addEventListener('click', clickBajaFetchAsync);


    //FILTROS 
    // if(document.getElementById("txtTransaccionFil").checked==true){
    //     console.log("sa");
    // }else{
    //     console.log("nnnn");
    // }
    // console.log(document.forms[0].getElementById("txtTransaccionFil"));
    document.getElementById("txtTransaccionFil").addEventListener('change', filtro1);

    document.getElementById("chkTitulo").addEventListener('change', chkCheckbox);
    document.getElementById("chkTransaccion").addEventListener('change', chkCheckbox);
    document.getElementById("chkDescripcion").addEventListener('change', chkCheckbox);
    document.getElementById("chkPrecio").addEventListener('change', chkCheckbox);
    document.getElementById("chkPuertas").addEventListener('change', chkCheckbox);
    document.getElementById("chkKMs").addEventListener('change', chkCheckbox);
    document.getElementById("chkPotencia").addEventListener('change', chkCheckbox);
    document.getElementById("chkId").addEventListener('change', chkCheckbox);
});



function chkCheckbox(e) {
    //console.log("mmmmmmi array =>",arrayAnuncios);
    if(arrayAnuncios === undefined){
        alert("La tabla tiene que ser cargada por lo menos una vez");
        document.getElementById("chkTitulo").checked = false;
        document.getElementById("chkTransaccion").checked = false;
        document.getElementById("chkDescripcion").checked = false;
        document.getElementById("chkPrecio").checked = false;
        document.getElementById("chkPuertas").checked = false;
        document.getElementById("chkKMs").checked = false;
        document.getElementById("chkPotencia").checked = false;
        document.getElementById("chkId").checked = false;
    }else{
        //console.log(e.target.id);
        console.log("mi array =>",arrayAnuncios);
        let stringAux = JSON.stringify(arrayAnuncios);
        let copia = JSON.parse(stringAux);
        filtroTablaTitulo(copia);
    }

}

function filtro1() {
    if(arrayAnuncios === undefined){
        alert("La tabla tiene que ser cargada por lo menos una vez");
        document.getElementById("txtTransaccionFil").value ="";
    }else{
        var tipo = document.getElementById("txtTransaccionFil").value;
        //console.log("arrayAnuncios",arrayAnuncios, "tipo", tipo);
        if(arrayAnuncios!= "" && tipo != ""){
            filtroTransaccion(arrayAnuncios , tipo);
        }
    }
}

export function llevaData(data) {
    arrayAnuncios = data;
}

function cargar() {
    document.getElementById('txtTitulo').value = "h";
    document.querySelector('#txtTransaccion').value = "Venta";
    document.getElementById('txtDescripcion').value = "2";
    document.getElementById('txtPrecio').value = "2";
    document.getElementById('txtPuertas').value = "2";
    document.getElementById('txtKms').value = "2";
    document.getElementById('txtPotencia').value = "2";
}

//obtenerPersona
export function obtenerAnuncio() {
    let id = document.getElementById("txtId").value;
    const nuevoAuto = new Anuncio_Auto(id,
        document.getElementById('txtTitulo').value,
        document.querySelector('#txtTransaccion').value,
        document.getElementById('txtDescripcion').value,
        document.getElementById('txtPrecio').value,
        document.getElementById('txtPuertas').value,
        document.getElementById('txtKms').value,
        document.getElementById('txtPotencia').value
    );
    return nuevoAuto;
}


//Actualizan la lista
function clickListar() {

    divTabla.style.display = "none";
    document.getElementById('containerSpinner').style.display = "block";
    setTimeout(() => {
        divTabla.innerHTML = "";
        divTabla.appendChild(crearTabla(obtenerAnuncios()));

        divTabla.style.display = "block";
        document.getElementById('containerSpinner').style.display = "none";
    }, 100); //3000
}

function clickEliminar() {
    eliminarAnuncio();
    clickListar();
}

function clickModificar() {
    editarAnuncio();
    clickListar();
}

function clickAlta(e) {
    e.preventDefault();
    let listaPersonas = obtenerAnuncios();
    const nuevoAuto = obtenerAnuncio();
    if (nuevoAuto) {
        listaPersonas.push(nuevoAuto);
        let id = obtenerId();
        guardarDatos(listaPersonas, (id + 1));

        limpiarFormulario();
    }
    clickListar();
}

//Metodo sin uso para ver como capturar los datos
export function limpiarFormulario() {
    document.getElementById('txtId').value = "";
    document.getElementById('txtTitulo').value = "";
    document.querySelector('#txtTransaccion').value = "";
    document.getElementById('txtDescripcion').value = "";
    document.getElementById('txtPrecio').value = "";
    document.getElementById('txtPuertas').value = "";
    document.getElementById('txtKms').value = "";
    document.getElementById('txtPotencia').value = "";
}