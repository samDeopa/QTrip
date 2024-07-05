import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  let city = search.substring(6);
  return city;
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try {
    const res = await fetch(
      config.backendEndpoint + "/adventures?city=" + city
    );
    const data = await res.json();
    return data;
  } catch {
    return null;
  }

  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  adventures.forEach(({ id, category, image, name, costPerHead, duration }) => {
    let div = document.createElement("div");
    if (id === "1773524915") id = "123456";

    div.className = " col-lg-3 col-6  mb-4";
    div.innerHTML = `<a href="detail/?adventure=${id}" id="${id}">
    <div class="activity-card">
      
      <div class="category-banner">${category}</div>
      <img class="img-responsive  " src="${image}" alt="" />
     
      <div class="activity-card-text text-md-center w-100 mt-3 px-2">
        <div class="d-block d-md-flex justify-content-between flex-wrap px-3">
          <h5>${name}</h5>
          <p>$${costPerHead}</p>
        </div>
        <div class="d-block d-md-flex justify-content-between flex-wrap px-3">
          <h5>Duration</h5>
          <p>${duration}</p>
        </div>
      </div>
    </div>
  </a>`;
    const dataDiv = document.getElementById("data");
    dataDiv.appendChild(div);
  });
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  return list.filter((ele) => ele.duration >= low && ele.duration <= high);
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  return list.filter((adventure) => {
    return categoryList.includes(adventure.category);
  });
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  if (filters.category.length != 0) {
    list = filterByCategory(list, filters.category);
  }
  if (filters.duration != "") {
    const duration = filters.duration.split("-");
    list = filterByDuration(list, duration[0], duration[1]);
  }
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  const div = document.querySelector("#category-list");

  div.innerHTML = "";

  filters.category.forEach((ele) => {
    let newDiv = document.createElement("div");

    newDiv.setAttribute("class", "category-filter");
    newDiv.setAttribute("id", ele);
    newDiv.innerHTML = ele;

    div.appendChild(newDiv);
  });

  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
