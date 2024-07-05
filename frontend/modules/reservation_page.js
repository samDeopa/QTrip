import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const url = `${config.backendEndpoint}/reservations`;
    const data = await fetch(url);
    const result = await data.json();
    //console.log(result);
    return result;
  } catch {
    // Place holder for functionality to work in the Stubs
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  if (reservations && reservations.length != 0) {
    document
      .querySelector("#no-reservation-banner")
      .setAttribute("style", "display:none");
    document
      .querySelector("#reservation-table-parent")
      .setAttribute("style", "display:block");

    reservations.forEach(
      ({ id, name, adventureName, person, date, time, price, adventure }) => {
        const currDate = new Date(date);
        const currTime = new Date(time);
        const tbody = document.getElementById("reservation-table");
        const tr = document.createElement("tr");
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        };

        tr.innerHTML = `<td><a href="/frontend/pages/adventures/detail/?adventure=${adventure}">${id}</a></td>
        <td>${name}</td>
        <td>${adventureName}</td>
        <td>${person}</td>
        <td>${currDate.toLocaleDateString("en-IN")}</td>
        <td>${price}</td>
        <td>${currTime
          .toLocaleString("en-IN", options)
          .replace(" at", ",")}</td>
        
        <td id="${id}"> <a href="/frontend/pages/adventures/detail/?adventure=${adventure}" class ="reservation-visit-button">Visit Adventure</a> <td>`;
        tbody.appendChild(tr);
      }
    );
  } else {
    document
      .querySelector("#no-reservation-banner")
      .setAttribute("style", "display:block");
    document
      .querySelector("#reservation-table-parent")
      .setAttribute("style", "display:none");
  }
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
