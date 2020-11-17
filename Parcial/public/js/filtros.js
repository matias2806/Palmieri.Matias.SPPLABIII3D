import { Anuncio_Auto } from './Anuncio_Auto.js';
import crearTabla from './tabla.js'


export function filtroTablaTitulo(data) {
    let ctitulo = document.getElementById("chkTitulo").checked;
    let cTransaccion = document.getElementById("chkTransaccion").checked;
    let cDescripcion = document.getElementById("chkDescripcion").checked;
    let cPrecio = document.getElementById("chkPrecio").checked;
    let cPuertas = document.getElementById("chkPuertas").checked;
    let cKms = document.getElementById("chkKMs").checked;
    let cPotencia = document.getElementById("chkPotencia").checked;
    let cId = document.getElementById("chkId").checked;

    //console.log(ctitulo,cTransaccion,cDescripcion,cPrecio,cPuertas);

    const sinTitulo = data.map((a) => {
        
        var obj = new Object;
        if(ctitulo == true){
            delete a.titulo;
        }
        if(cTransaccion == true){
            delete a.transaccion;
        }
        if(cDescripcion == true){
            delete a.descripcion;
        }
        if(cPrecio == true){
            delete a.precio;
        }
        if(cPuertas == true){
            delete a.puertas;
        }
        if(cKms == true){
            delete a.kms;
        }
        if(cPotencia == true){
            delete a.potencia;
        }
        if(cId == true){
            delete a.id;
        }
        return a
    });
    console.log("sin campo",sinTitulo);
    divTabla.innerHTML = "";
    divTabla.appendChild(crearTabla(sinTitulo));
    filtroTransaccion(sinTitulo, document.getElementById("txtTransaccionFil").value);
    promedioDePrecios(sinTitulo);

}

export function filtroTransaccion(data, tipo) {
    //debugger
    //console.log("filtro",data ,"tipo", tipo);
    if (tipo != "TODAS" && tipo != "") {
        const vec = data.filter((elemento) => {
            if (elemento.transaccion == tipo) {
                return true;
            }
        });
        divTabla.innerHTML = "";
        //console.log("vec",vec);
        divTabla.appendChild(crearTabla(vec));
        promedioDePrecios(vec);
    } else {
        divTabla.innerHTML = "";
        //console.log("vec",vec);
        divTabla.appendChild(crearTabla(data));
        promedioDePrecios(data);
    }
    //filtroTablaTitulo(data);
}


export function promedioDePrecios(data) {
    var a = document.getElementById("txtTransaccionFil").value;
    //console.log("a ",a);
    if(a =="" ){
        //document.getElementById("txtTransaccionFil").value = "TODOS";
        document.getElementById("txtPrecioFilter").value = "N/A";
    }
    else if(a == "Venta" || a == "Alquiler"){
        const precio = data.reduce((prev, actual) => {
    
            return (parseInt(prev) + parseInt(actual.precio));
        }, 0);
        //console.log(precio);
        document.getElementById("txtPrecioFilter").value = precio/ data.length;
    }
    else{
        document.getElementById("txtPrecioFilter").value = "N/A";
    }
}



//Cosas Utiles
const numeros = [5, 3, 8, 5, 1, 3];

const personas = [{
        nombre: "Juan",
        edad: 23,
        sexo: 'm'
    },
    {
        nombre: "Lucia",
        edad: 29,
        sexo: 'f'
    },
    {
        nombre: "Miguel",
        edad: 25,
        sexo: 'm'
    },
    {
        nombre: "Andrea",
        edad: 22,
        sexo: 'f'
    },
    {
        nombre: "Luisa",
        edad: 26,
        sexo: 'f'
    },
]


export function filtro() {
    const vec = numeros.filter((elemento, indice, vector) => {
        //console.log(elemento,indice,vector);
        if (elemento >= 4) {
            return true;
        } else {
            return false;
        }
    });
    console.log(numeros);
    console.log(vec);
}

export function filtroSexo() {
    const vec = personas.filter((elemento) => {
        //console.log(elemento,indice,vector);
        if (elemento.sexo === 'f') {
            return true;
        } else {
            return false;
        }
    });
    console.log(personas);
    console.log(vec);
}

export function mapNumerosCuadrado() {
    const cuadrado = numeros.map((e) => {
        return e * e;
    });
    console.log(numeros);
    console.log(cuadrado);
}
//solo un atributo
export function filtraCampos() {
    const nombres = personas.map((per) => {
        return per.nombre;
    });
    console.log(nombres);
}
//varios atributos
export function filtraCampos2() {
    const nombres = personas.map((per) => {
        return {
            nombre: per.nombre,
            edad: per.edad
        };
    });
    console.log(nombres);
}

//reduce me da un solo valor 
export function reduceSumaEdades() {
    const edades = personas.reduce((prev, actual) => {
        return prev + actual.edad;
    }, 0);
    console.log(edades);
}

export function reduceElMayor() {
    const mayor = numeros.reduce((prev, actual) => {
        return prev > actual ? prev : actual;
    }, 0);
    console.log(mayor);
}


/*

*/