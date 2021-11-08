/* la idea de mi proyecto es resolver un problema de la vida cotidiana, que es no saber que 
cocinar en base a los ingredientes que tengo en la heladera, la idea es que se ingresen los 
ingredientess que uno disponga, y en base a estos me sugiera comidas que pueda hacer con lo que 
tenga en casa */


class Comida{
    constructor(id, nombre, vegetariano, dificultad, tiempo, ingredientes, imagen, paisComida) {
                 this.id = id;
                 this.nombre = nombre;
                 this.vegetariano = vegetariano;
                 this.dificulad = dificultad;
                 this.tiempo = tiempo;
                 this.ingredientes = ingredientes;
                 this.imagen = imagen;
                 this.paisComida = paisComida;
    }
}

const hamburguesa = new Comida (1, "Hamburguesa",false,"baja",20,["pan", "carne", "queso"],"hamburguesa.jpg","US");
const fideos = new Comida (2, "Fideos",true,"baja",10,["fideos", "tomate","cebolla"],"fideos.jpg","IT");
const pancho = new Comida (3, "Pancho",false,"baja",5,["pan", "salchicha", "mayonesa", "ketchup"],"pancho.jpg","US");
const salsa = new Comida (4, "Salsa",false,"baja",50,["cebolla", "tomate", "especias"],"salsa.jpg","EU");
const pan = new Comida (5, "Pan",true,"media",90,["harina", "levadura", "aceite"],"pan.jpg","EU");
const ensalada = new Comida (6, "Ensalada",true,"baja",10,["lechuga","tomate","cebolla"],"ensalada.jpg","EU");
const locro = new Comida (7, "Locro",false,"alta",120,["maiz","poroto","cebolla","cerdo"],"locro.jpg","AR");
const empanadas = new Comida (8, "Empanadas",false,"media",60,["tapas","carne","pollo","cebolla"],"empanadas.jpg","AR");
const milanesa = new Comida (9, "Milanesa",false,"baja",60,["carne","pan","aceite","huevo"],"milanesa.jpg","AR");
const asado = new Comida (9, "Asado",false,"alta",90,["carne","sal","condimentos"],"asado.jpg","AR");

const arrayComidas =[];
const contenedorBusquedas = [];
let arrayFav  = [];

arrayComidas.push(asado, milanesa, empanadas, locro, ensalada, pan, salsa, pancho, fideos, hamburguesa);

const $contenedorComidas = document.getElementById("contenedorComidas");

const $contenedorComidaFav = document.getElementById("contenedorComidaFav");

const $contenedorComidasPais = document.getElementById("contenedorComidasPais");

const $contenedorComidaBuscada = document.getElementById("comidaBuscada");

function mostrarArrayComidas(){
    for(const comida of arrayComidas) {
        let container = document.createElement("div");
        container.classList.add('card')
        container.classList.add(`${comida.nombre}`)
        container.innerHTML=`
                <div id="contenedorCard">
                    <div class="col">
                        <button type="button" id=${comida.nombre} class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <img class="card-img-top" src="images/${comida.imagen}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${comida.nombre}</h5>
                            <p>Ingredientes: ${comida.ingredientes}</p>
                            <p>Dificultad: ${comida.dificulad} </p>
                            <p>Tiempo: ${comida.tiempo} min</p>
                        <button id=${comida.id} class=" botonFavoritosbtn btn-primary comprar">Agregar a Favoritos</button>
                    </div>
                </div>
       `
        $contenedorComidas.prepend(container);
        document.getElementById(`${comida.id}`).addEventListener('click', () => agregarFavoritos(comida));
        $(`#${comida.nombre}`).click(function(){
            $(`.${comida.nombre}`).remove();
        })
        let cardHover = $(`.${comida.nombre}`)
        cardHover.mouseenter(()=>{cardHover.animate({width: '102%', height: '102%',},200);})
        cardHover.mouseleave(()=>{cardHover.animate({width: '100%', height: '100%',},90)})
    }
}

let formulario = document.getElementById ("buscador");
let busqueda = document.querySelector("input")

formulario.addEventListener("submit", validar);
busqueda.addEventListener("input", validacionInput);


function validacionInput(e){
    buscarComida(e.target.value, arrayComidas)
}

function validar (e){
    e.preventDefault();
    let valorIngresado = e.target
    buscarComida(valorIngresado[0].value, arrayComidas);
}

function buscarComida(ingredientesIngresados, arrayComidas){
    agregarComidaBuscada(arrayComidas.find(comida => comida.ingredientes.includes(ingredientesIngresados)));
}

function agregarComidaBuscada(comida){
            let container = document.createElement("div");
            container.classList.add('comidaBuscadaEstilo')
            container.innerHTML=`''`
            container.innerHTML=`
                <div class="card mb-3 imagenComidaBuscada">
                    <div class="row g-0">
                        <div class="col-md-4 imagenBusqueda">
                            <img src="images/${comida.imagen}" class="img-fluid rounded-start contenedor contenido">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${comida.nombre}</h5>
                                <p>Ingredientes: ${comida.ingredientes}</p>
                                <p>Dificultad: ${comida.dificulad} </p>
                                <p>Tiempo: ${comida.tiempo} min</p>
                                <p>Aca iria la receta bien resumida falta terminar esta parte</p>

                            </div>
                        </div>
                      </div>
                    </div>  
                </div>
           `
           $contenedorComidaBuscada.prepend(container);   
}

function agregarFavoritos(comida){
    let existFav = arrayFav.find(elemento => elemento.id === comida.id);
    if (existFav){
    }else{
    //si no esta en favoritos entonces lo agrego
       arrayFav.push(comida);
       cantidadTot ++;
       localStorage.setItem("Contador", cantidadTot);
       localStorage.setItem('comidasFavoritas', JSON.stringify(arrayFav));

       cantidadTot = localStorage.getItem("Contador", cantidadTot);
       contador.innerHTML = cantidadTot;

       const idContendedor = document.getElementById("contenedorComidaFav");
       let container = document.createElement("li");
       container.classList.add('comidaAgregada');
        //este inner es para que agregue sin necesidad de refrescar la pagina//
       container.innerHTML=`
                           <p>${comida.nombre}</p> `
      idContendedor.appendChild(container);
    }
}

function cargarLocalStorage(){
    const idContendedor = document.getElementById("contenedorComidaFav");
    cantidadTot = localStorage.getItem("Contador", cantidadTot);

    contador.innerHTML = cantidadTot;

    let favoritosLocal = JSON.parse(localStorage.getItem("comidasFavoritas"));

    if(favoritosLocal){
        for (let i = 0; i < favoritosLocal.length; i++) {
            arrayFav.push(new Comida(favoritosLocal[i].id, favoritosLocal[i].nombre))
            let container = document.createElement("li");
            container.classList.add('comidaAgregada')
            container.innerHTML=`
                                <p>${favoritosLocal[i].nombre}</p>`
           idContendedor.appendChild(container);
        }
    }
}

function agregarComidaDom(comida){
    if(contenedorBusquedas.includes(comida)){
        return
    }else{
        contenedorBusquedas.push(comida)
        let container = document.createElement("div");

        container.classList.add('card')
        container.classList.add(`${comida.nombre}`)
        container.innerHTML=`
                <div id="contenedorCard">
                    <div class="col">
                        <button type="button" id=${comida.nombre} class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <img class="card-img-top" src="images/${comida.imagen}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${comida.nombre}</h5>
                            <p>Ingredientes: ${comida.ingredientes}</p>
                            <p>Dificultad: ${comida.dificulad} </p>
                            <p>Tiempo: ${comida.tiempo} min</p>
                        <button id=${comida.id} class=" botonFavoritos btn btn-primary comprar">Agregar a Favoritos</button>
                    </div>
                </div>
       `
       $contenedorComidasPais.prepend(container);
        document.getElementById(`${comida.id}`).addEventListener('click', () => agregarFavoritos(comida));
                $(`#${comida.nombre}`).click(function(){
            $(`.${comida.nombre}`).remove();
        })
    }
}

function obtenerPais(){
    const url = 'https://api.country.is/';
    countryRet = $.get(url,function(country, result){
      localStorage.setItem("country", country.country);
    })
}

function mostrarComidaPaises(){
    obtenerPais();
    country = localStorage.getItem("country");
     let container = document.createElement("div");
     let comidaBuscada = document.getElementById("comidaBuscada")
     let comidaPais = arrayComidas.filter(el => el.paisComida.includes(country))
     container.innerHTML=`<h3 class="tituloComidas">Comidas Sugeridas por estar en ${country}</h3>`
     for(const comida of comidaPais) {
        agregarComidaDom(comida);
     }
     comidaBuscada.append(container);
}

let arrayComidasFavoritas = JSON.parse(localStorage.getItem("comidasFavoritas"));


// esto hace que el dropdown no se cierre cuando haga click dentro
$('.dropdown-menu').on('click', function(event){
    event.stopPropagation();
});

let cantidadTot = 0;

mostrarComidaPaises();

mostrarArrayComidas();

cargarLocalStorage();

