const listaPokemon = document.querySelector("#listaPokemon");
const pokemon = document.getElementById("namePokemon");
const buttonSearch = document.getElementById("searchPokemon");
const buttonMostrar = document.getElementById("mostrarLista");

let URL = "https://pokeapi.co/api/v2/pokemon/";

const listPokemon = [];

const loadingPokemon = async () => {
  for (let i = 1; i <= 150; i++) {
    const data = await (await fetch(URL + i)).json();
    listPokemon.push(data);
  }
  await listPokemon.forEach((poke, i) => {
    mostrarPokemon(poke, i);
  });
};
loadingPokemon();

buttonMostrar.addEventListener("click", async()=>{
  listaPokemon.innerHTML="";
  await listPokemon.forEach((poke, i) =>{ 
    mostrarPokemon(poke, i);
   }) 
}, false);

class Pokemon {
  constructor(numero, nombre, tipo) {
    this.numero = numero;
    this.nombre = nombre;
    this.tipo = tipo;
  }
}
const pokemon1 = new Pokemon(0, "No encontrado", "Sin tipo");

const pokemon1String = JSON.stringify(pokemon1);
localStorage.setItem("pokemon1", pokemon1String);

let pokemonAdded = [];
const addPokemon = (i) => {
  pokemonAdded.push(listPokemon[i]);
  console.log(listPokemon[i]);
  console.log(pokemonAdded)
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Pokemon Agregado correctamente!!',
    showConfirmButton: false,
    timer: 1500
  })
};

const showPokemonAdded = async() => {
  listaPokemon.innerHTML="";
  await pokemonAdded.forEach((poke,i) =>{
    mostrarPokemon(poke,i);
  })

};

function mostrarPokemon(data, i) {
  const div = document.createElement("div");
  div.classList.add("card-pokemon");
  div.innerHTML = `<div class="card" style="width: 18rem;">
    <h1>${data.name}</h1>
    <img src="${data.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="...">
    <div class="card-body">
      <ul>
        <li>
            Numero: ${data.id} 
        </li>
        <li>
            Nombre: ${data.name}
        </li>
        <li>
            Tipo: ${data.types[0].type.name}
        </li>
      </ul>
      <button type="button" class="btn btn-outline-dark" onclick="addPokemon(${i})" >Agregar</button>
    </div>
  </div>
</div>`;
  listaPokemon.append(div);
}

async function getPokemon() {
  let pokemon = document.getElementById("namePokemon").value;
  try{
    let data = await fetch(`${URL}${pokemon}`);
    data = await data.json();
    listaPokemon.innerHTML = "";
    mostrarPokemon(data);
  }catch(error){
      Swal.fire({
        icon: 'error',
        title: 'Pokemon no encontrado!',
        timer: 1500
      })
  }
}

document.getElementById("searchPokemon").addEventListener("click", getPokemon);
document.getElementById("mostrarLista").addEventListener("click", mostrarPokemon)
