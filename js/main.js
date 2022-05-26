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
