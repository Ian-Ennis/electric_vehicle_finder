import { useState } from "react";
import SelectedVehicle from "./SelectedVehicle";
import { v4 as uuidv4 } from "uuid";
// import Highchart from "./Highchart";


function Dropdowns({ vehicles, typeSelected, dropdownsFulfilled, setDropdownsFulfilled }) {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState([])

  
  const makesByYear = [];
  const showMakes = (e) => {
    e.preventDefault();

    const modelYear = e.target.value;

    for (let i = 0; i < vehicles.length; i++) {
      if (
        vehicles[i].model_year === modelYear &&
        !makesByYear.includes(vehicles[i].manufacturer_name)
      ) {
        makesByYear.push(vehicles[i].manufacturer_name);
      }
    }
    setMakes(makesByYear);
  };


  const modelsByMake = [];
  const selectModel = (e) => {
    e.preventDefault();

    const make = e.target.value;

    for (let i = 0; i < vehicles.length; i++) {
      if (
        vehicles[i].manufacturer_name === make &&
        !modelsByMake.includes(vehicles[i].model)
      ) {
        modelsByMake.push(vehicles[i].model);
      }
    }
    setModels(modelsByMake);
  };


  const showselectedVehicle = (e) => {
    e.preventDefault();

    const model = e.target.value;

    for (let i = 0; i < vehicles.length; i++) {
      if (vehicles[i].model === model) {
        setSelectedVehicle([vehicles[i]]);
      }
    }
  };


  return (
    <>
      <>
        <div id="specific_vehicle_search">
          <h4>Search by specific vehicle</h4>
    {/* ===================================================================== */}

          {/* MODEL YEAR */}

          <label htmlFor="automobiles">Model year: </label>

          <select
            name="automobiles"
            id="automobiles"
            onChange={(e) => showMakes(e)}
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

            {makes.length
              ? makes.map((make) => <option key={uuidv4()} value={make}>{make}</option>)
              : null}
          </select>

          <label htmlFor="pet-select">Choose a pet:</label>
    {/* ===================================================================== */}

          {/* MODELS */}

          <label htmlFor="automobiles">Model: </label>

          <select
            name="automobiles"
            id="automobiles"
            onChange={showselectedVehicle}
          >
            <option>-Select-</option>

            {models.length
              ? models.map((model) => (
                  <option key={uuidv4()} value={model}>
                    {model}
                  </option>
                ))
              : null}
          </select>

          <button
            onClick={(e) => {
              e.preventDefault();
              setDropdownsFulfilled(true);
            }}
          >
            Go
          </button>
    {/* ===================================================================== */}
        </div>
        <div></div>
      </>
      {dropdownsFulfilled && !typeSelected ? (
        <SelectedVehicle vehicle={selectedVehicle} />
      ) : null}

      <br />
      <br />

      {/* <Highchart vehicle={chosenVehicle} /> */}


    </>
  );
}

export default Dropdowns;