import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  const adventureId = search.split("=")[1];
  return adventureId;
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  try {
    const res = await fetch(
      config.backendEndpoint + "/adventures/detail?adventure=" + adventureId
    );
    const data = await res.json();
    return data;
  } catch {
    return null;
  }

  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the  by making an API call

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  const { name, subtitle, images, content } = adventure;
  document.querySelector("#adventure-name").append(name);
  document.querySelector("#adventure-subtitle").append(subtitle);
  document.querySelector("#adventure-content").append(content);
  const gallery = document.querySelector("#photo-gallery");
  addBootstrapPhotoGallery(images);
  // images.forEach((img) => {
  //   const div = document.createElement("div");
  //   const imgNode = document.createElement("img");
  //   imgNode.setAttribute("src", img);
  //   imgNode.setAttribute("class", "activity-card-image");
  //   div.appendChild(imgNode);
  //   gallery.appendChild(div);
  // });

  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  const innerCarosel = document.querySelector(".carousel-inner");
  var classList = "carousel-item active";
  images.forEach((image) => {
    const div = document.createElement("div");
    div.classList = classList;
    classList = "carousel-item";
    const imgNode = document.createElement("img");
    imgNode.setAttribute("src", image);
    imgNode.classList = "d-block w-100 activity-card-image";
    div.appendChild(imgNode);
    innerCarosel.appendChild(div);
  });
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  if (adventure.available) {
    document
      .getElementById("reservation-panel-sold-out")
      .setAttribute("style", "display:none");
    document
      .getElementById("reservation-panel-available")
      .setAttribute("style", "display:block");
    document.getElementById("reservation-person-cost").innerHTML =
      adventure.costPerHead;
  } else {
    document
      .getElementById("reservation-panel-sold-out")
      .setAttribute("style", "display:block");
    document
      .getElementById("reservation-panel-available")
      .setAttribute("style", "display:none");
  }

  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  document.getElementById("reservation-cost").innerHTML =
    adventure.costPerHead * persons;
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
}

//Implementation of reservation form submission
async function captureFormSubmit(adventure) {
  const formElement = document.getElementById("myForm");

  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const data = {
        date: formElement.elements.date.value,
        name: formElement.elements.name.value,
        person: formElement.elements.person.value,
        adventure: adventure.id,
      };

      const res = await fetch(config.backendEndpoint + "/reservations/new", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("Success!");
      }
      window.location.reload();
    } catch (e) {
      alert("!Failed");
    }
  });
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  if (adventure["reserved"]) {
    document
      .querySelector("#reserved-banner")
      .setAttribute("style", "display:block");
  } else {
    document
      .querySelector("#reserved-banner")
      .setAttribute("style", "display:none");
  }
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
