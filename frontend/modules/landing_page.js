import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  try {
    const res = await fetch(config.backendEndpoint + "/cities");
    const data = await res.json();
    return data;
  } catch (e) {
    return null;
  }

  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  const div = document.getElementById("data");

  const newDiv = document.createElement("div");
  newDiv.className = "col-lg-3 col-6 mb-4  ";
  newDiv.innerHTML = `<a id=${id} href="pages/adventures/?city=${id}"> <div class="tile"> <img   src="${image}" alt="city image"> <div class="tile-text">  <h4>${city}</h4> <p>${description}</p></div></div> </a>  `;
  div.appendChild(newDiv);
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
}

export { init, fetchCities, addCityToDOM };
