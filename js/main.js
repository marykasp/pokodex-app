const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");
const search = document.querySelector("#search-input");

const generateCard = (pokemon) => {
  console.log(pokemon);
};

const getPokeData = async () => {
  // Generate a random number between 1 and 150
  let id = Math.floor(Math.random() * 150) + 1;
  console.log(id);
  // fetch data using random id
  const response = await fetch(`${url}${id}`);
  if (response.ok) {
    const pokemon = await response.json();
    generateCard(pokemon);
  }
};

// Add Event Listeners
btn.addEventListener("click", getPokeData);
