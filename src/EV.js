import { useState, useEffect } from "react";
import sedan from "./Images/sedan.jpeg";
import suv from "./Images/suv.jpeg";
import pickup from "./Images/pickup.jpeg";
import DisplayVehicles from "./DisplayVehicles";
import { v4 as uuidv4 } from "uuid";

const APIkey = `FWa7ECkCD7pV8HgIVkhHEKXfvBTbeo9ZI6bhRRY5`;

function EV() {
  const [vehicles, setVehicles] = useState([]);
  const [typeSelected, setTypeSelected] = useState(false);
  const [dropdownsFulfilled, setDropdownsFulfilled] = useState(false)

  const fetchVehicles = (e, vehicleType, year = 2023) => {
    e.preventDefault();

    fetch(
      `https://developer.nrel.gov/api/vehicles/v1/light_duty_automobiles.json?api_key=${APIkey}&current=false&fuel_id=41&category_id=${vehicleType}&model_year=${year}`
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setVehicles(data.result);
        });
      } else {
        res.json().then((error) => {
          console.log("error fetching makes for selected year:", error);
        });
      }
    });

    if (e.target.alt === "vehicle_type_icon") {
      document.getElementById("vehicle_type_container").id =
      "vehicle_display_container";
      setTypeSelected(true)
    }
  };

//   const extraVehicleInfo = [
//     {
//     id: 13221,
//     model: "e-tron GT/RS e-tron GT",
//     msrp: "$104,900",
//   },
// ]

  const makesByYear = [];
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].manufacturer_name && (!makesByYear.includes(vehicles[i].manufacturer_name))) {
      makesByYear.push(vehicles[i].manufacturer_name);
    }
  }
  
  const modelsByMake = [];

  const selectModel = (e) => {
    e.preventDefault()

    const modelsByMake = [];
    for (let i = 0; i < vehicles.length; i++) {
      if ((vehicles[i].manufacturer_name === e.target.value) && !modelsByMake.includes(vehicles[i].manufacturer_name)) {
        modelsByMake.push(vehicles[i].model)
      }
    }
    return modelsByMake.map(make => {
      <option key={uuidv4()} value={make}>{make}</option>
    })
  }
  
  const goBack = (e) => {
    e.preventDefault()
  
    if (document.getElementById("vehicle_display_container"))
    document.getElementById("vehicle_display_container").id =
    "vehicle_type_container";
  
    setVehicles([])
    setDropdownsFulfilled(false)
    setTypeSelected(false)
  }

  return (
    <>
      <button onClick={goBack}>go back</button>
      {!dropdownsFulfilled && !typeSelected ? (
        <>
          <div>
            <h4>Search by specific vehicle</h4>
{/* ===================================================================== */}
            <label htmlFor="automobiles">Model year: </label>

            <select
              name="automobiles"
              id="automobiles"
              form="automobile_form"
              onChange={(e) => fetchVehicles(e, `27,29,25`, e.target.value)}>

              <option>select</option>

              <option value={2023}>2023</option>
              <option value={2022}>2022</option>
              <option value={2021}>2021</option>

            </select>
{/* ===================================================================== */}
            <label htmlFor="automobiles">Make: </label>
            
            <select
              name="automobiles"
              id="automobiles"
              form="automobile_form"
              onChange={selectModel}>

              <option>select</option>

              {makesByYear.length
                ? {selectModel}
                : null}
            </select>
{/* ===================================================================== */}
            <label htmlFor="automobiles">Model: </label>

            <select name="automobiles" id="automobiles" form="automobile_form">

              <option>select</option>
            </select>
{/* ===================================================================== */}







            </div>
          <div></div>
        </>
      ) : null}
      {dropdownsFulfilled ? <DisplayVehicles gothereby={"dropdowns"} /> : null}

      <br />
      <br />

      <div>
        <div id="vehicle_type_container">
          {!typeSelected ? (
            <>
              <h4>Search by type</h4>
              <div onClick={(e) => fetchVehicles(e, 27)}>
                <h5>Sedan/ Wagon</h5>
                <img
                  style={{ width: "40%" }}
                  src={sedan}
                  alt="vehicle_type_icon"
                />
              </div>
              <div onClick={(e) => fetchVehicles(e, 29)}>
                <h5>SUV</h5>
                <img
                  style={{ width: "40%" }}
                  src={suv}
                  alt="vehicle_type_icon"
                />
              </div>
              <div onClick={(e) => fetchVehicles(e, 25)}>
                <h5>Pickup</h5>
                <img
                  style={{ width: "40%" }}
                  src={pickup}
                  alt="vehicle_type_icon"
                />
              </div>
            </>
          ) : (
            <DisplayVehicles gothereby={"types"} vehicles={vehicles} />
          )}
        </div>
      </div>
    </>
  );
}

export default EV;
