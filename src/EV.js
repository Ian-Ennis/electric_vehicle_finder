import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function EV() {
  const [vehiclesByYear, setvehiclesByYear] = useState([]);

  const queryYears = (e, name) => {
    e.preventDefault();

    fetch(`https://developer.nrel.gov/api/vehicles/v1/light_duty_automobiles.json?api_key=DEMO_KEY&current=false&fuel_id=41&model_year=${e.target.value}`).then (res => {
      if (res.ok) {
        res.json().then(data => {
          console.log(data.result)
          setvehiclesByYear(data.result)
        })
      } else {
        res.json().then(error => {
          console.log('error fetching makes for selected year:', error)
        })
      }
    })
  }

  let manufacturers = {}
  if (vehiclesByYear.length) {
    vehiclesByYear.forEach(ev => {
      if (!manufacturers[ev.manufacturer_name]) {
        manufacturers[ev.manufacturer_name] = 1
      }
    })
  }


  return (
    <>
      <div>
        <h4>Search by specific vehicle</h4>
        <label htmlFor="automobiles">Model year: </label>
        <select name="automobiles" id="automobiles" form="automobile_form" onChange={queryYears}>
          <option>
            select
          </option>
          <option value={"2023"}>
            2023
          </option>
          <option value={"2022"}>
            2022
          </option>
          <option value={"2021"}>
            2021
          </option>
        </select>

        <label htmlFor="automobiles">Make: </label>
        <select name="automobiles" id="automobiles" form="automobile_form" onChange={queryYears}>
          <option value={"2023"}>
            2023
          </option>
          <option value={"2022"}>
            2022
          </option>
          <option value={"2021"}>
            2021
          </option>
        </select>

        <label htmlFor="automobiles">Model: </label>
        <select name="automobiles" id="automobiles" form="automobile_form" onChange={queryYears}>
          <option value={"2023"}>
            2023
          </option>
          <option value={"2022"}>
            2022
          </option>
          <option value={"2021"}>
            2021
          </option>
        </select>
      </div>
      <div>
        {/* {vehiclesByYear.length ? vehiclesByYear.map(ev => 
          <div key={uuidv4()}>
            {ev.model_year}
          </div>) : null} */}
      </div>
    </>
  );
}

export default EV;
