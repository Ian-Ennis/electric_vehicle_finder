import { useState, useEffect } from "react";
import sedan from "./Images/sedan.jpeg";
import suv from "./Images/suv.jpeg";
import pickup from "./Images/pickup.jpeg";
import SelectedVehicle from "./SelectedVehicle";
import DisplayVehicles from "./DisplayVehicles";
import { v4 as uuidv4 } from "uuid";
import { type } from "@testing-library/user-event/dist/type";

const APIkey = `FWa7ECkCD7pV8HgIVkhHEKXfvBTbeo9ZI6bhRRY5`;

function EV() {
  const [vehicles, setVehicles] = useState([]);
  const [typeSelected, setTypeSelected] = useState(false);
  const [dropdownsFulfilled, setDropdownsFulfilled] = useState(false)
  const [selectedModels, setSelectedModels] = useState([])
  const [chosenVehicle, setChosenVehicle] = useState({})

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


  const makesByYear = [];
  if (vehicles.length) {
    for (let i = 0; i < vehicles.length; i++) {
      if (!makesByYear.includes(vehicles[i].manufacturer_name)) {
        makesByYear.push(vehicles[i].manufacturer_name);
      }
    }
  }
  

  const modelsByMake = [];
  const selectModel = (e) => {
    e.preventDefault();

    for (let i = 0; i < vehicles.length; i++) {
      if (
        vehicles[i].manufacturer_name === e.target.value &&
        !modelsByMake.includes(vehicles[i].model)
      ) {
        modelsByMake.push(vehicles[i].model);
      }
    }
    setSelectedModels(modelsByMake)
  };
  

  const showChosenVehicle = (e) => {
    e.preventDefault();

    for (let i = 0; i < vehicles.length; i++) {
      if (vehicles[i].model === e.target.value) {
        setChosenVehicle(vehicles[i])
        setDropdownsFulfilled(true)
      }
    }
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
            <DisplayVehicles vehicles={vehicles} />
          )}
        </div>
      </div>

      <br />
      <br />

      {!typeSelected ? 
        <>
          <div>
            <h4>Search by specific vehicle</h4>
{/* ===================================================================== */}
              {/* MODEL YEAR */}
              <label htmlFor="automobiles">Model year: </label>

              <select
                name="automobiles"
                id="automobiles"
                onChange={(e) => fetchVehicles(e, `27,29,25`, e.target.value)}
              >
                <option>-Select-</option>

                <option value={2023}>2023</option>
                <option value={2022}>2022</option>
                <option value={2021}>2021</option>
              </select>
{/* ===================================================================== */}
              {/* MAKE */}
              <label htmlFor="automobiles">Make: </label>

              <select
                name="automobiles"
                id="automobiles"
                onChange={selectModel}
              >
                <option>-Select-</option>

                {makesByYear.length
                  ? makesByYear.map((make) => (
                      <option key={uuidv4()}>
                        {make}
                      </option>
                    ))
                  : null}
              </select>
{/* ===================================================================== */}
              {/* MODELS */}
              <label htmlFor="automobiles">Model: </label>

              <select
                name="automobiles"
                id="automobiles"
                onChange={showChosenVehicle}
              >
                <option>-Select-</option>

                {selectedModels.length
                  ? selectedModels.map((model) => (
                      <option key={uuidv4()} value={model}>
                        {model}
                      </option>
                    ))
                  : null}
              </select>
{/* ===================================================================== */}
          </div>
          <div></div>
        </>
      
        : null}
      {dropdownsFulfilled && !typeSelected ? (
        <SelectedVehicle vehicle={chosenVehicle} />
      ) : null}
    </>
  );
}

export default EV;
