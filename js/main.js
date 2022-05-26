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
  dark: "#705746",
};
const url = "https://pokeapi.co/api/v2/";
const btn = document.getElementById("btn");
const typeBtn = document.querySelectorAll(".nav-link");
const search = document.querySelector("#search-input");
const logo = document.querySelector(".logo span");
const cardContainer = document.querySelector(".card-wrapper-inner");

const appendTypes = (types, element) => {
  types.forEach((item) => {
    const span = document.createElement("span");
    span.innerText = item.type.name;
    element.appendChild(span);
  });
};

const styleCard = (color, card) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #fff 36%)`;
  card.querySelectorAll(".types span").forEach((type) => {
    type.style.backgroundColor = color;
  });
  // logo.style.color = color;
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

  if (!imgSrc) {
    imgSrc = sprites.other[official - artwork].front_default;
  }

  // Set theme color based on pokemon type
  const themeColor = typeColor[types[0].type.name];

  // create new card for each pokemon
  const card = document.createElement("div");
  card.setAttribute("id", "card");

  card.innerHTML = `
    <p class="hp">
      <span>HP</span>
        ${hp}
    </p>
    <img src="${imgSrc}" alt="${name}" />
    <h2 class="poke-name">${name[0].toUpperCase() + name.slice(1)}</h2>
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

  const typeDiv = card.children[3];

  appendTypes(types, typeDiv);
  styleCard(themeColor, card);
  cardContainer.appendChild(card);
};

const generatePokeArr = (arr) => {
  arr.forEach((item) => {
    console.log(item);
  });
};

const getPokeData = async (term) => {
  // fetch data using random id
  const response = await fetch(`${url}pokemon/${term}`);
  if (response.ok) {
    const pokemon = await response.json();
    generateCard(pokemon);
  }
};

const getPokeTypes = async (type) => {
  const response = await fetch(`${url}type/${type}`);
  if (response.ok) {
    const data = await response.json();
    data.pokemon.forEach((item) => {
      // get name of each pokemon and pass to getPokeData
      getPokeData(item.pokemon.name);
    });
  }
};

// Add Event Listeners
btn.addEventListener("click", () => {
  // clear container
  cardContainer.innerHTML = "";
  // Generate a random number between 1 and 150
  let id = Math.floor(Math.random() * 150) + 1;
  console.log(id);
  getPokeData(id);
});

search.addEventListener("change", (e) => {
  cardContainer.innerHTML = "";
  // pass value entered to fetch endpoint
  const name = e.target.value.trim().toLowerCase();
  getPokeData(name);
  e.target.value = "";
});

// iterate over the buttons and add event listener to each getting the target
typeBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    cardContainer.innerHTML = "";
    let type = e.target.id;
    // fetch data for those pokemon types
    getPokeTypes(type);
  });
});

// display a random pokemon card when window loads
// window.addEventListener(
//   "load",
//   getPokeData(Math.floor(Math.random() * 150) + 1)
// );
