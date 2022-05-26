const typeColor = {
  bug: "#26de8a",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#efb549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190ff",
};
const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");
const search = document.querySelector("#search-input");

const appendTypes = (types) => {
  types.forEach((item) => {
    const span = document.createElement("span");
    span.innerText = item.type.name;
    document.querySelector(".types").appendChild(span);
  });
};

const styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #fff 36%)`;
};

// Generate card
const generateCard = (pokemon) => {
  console.log(pokemon);
  // destructure pokemon object to get necessary properties
  const { name, stats, sprites, types } = pokemon;
  const [stat1, stat2, stat3, stat4, stat5] = stats;
  // stats is an array of objects - get base_stat property from first 4 objects
  const hp = stat1.base_stat;
  const attack = stat2.base_stat;
  const defense = stat3.base_stat;
  const speed = stat5.base_stat;
  const imgSrc = sprites.other.dream_world.front_default;

  // Set theme color based on pokemon type
  const themeColor = typeColor[types[0].type.name];

  card.innerHTML = `
    <p class="hp">
      <span>HP</span>
        ${hp}
    </p>
    <img src="${imgSrc}" alt="${name}" />
    <h2 class="poke-name">${name}</h2>
    <div class="types">
  
    </div>
    <div class="stats">
      <div>
        <h3>${attack}</h3>
        <p>Attack</p>
      </div>
      <div>
        <h3>${defense}</h3>
        <p>Defense</p>
      </div>
      <div>
        <h3>${speed}</h3>
        <p>Speed</p>
      </div>
    </div>
  `;

  appendTypes(types);
  styleCard(themeColor);
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
// display a random pokemon card when window loads
window.addEventListener("load", getPokeData);
