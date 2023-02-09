import SelectedVehicle from "./SelectedVehicle";
import { v4 as uuidv4 } from "uuid";


function Dropdowns({ vehicles, typeSelected, dropdownsFulfilled, setDropdownsFulfilled, chosenVehicle }) {

    const makesByYear = [];
  const showMakes = (e) => {
    e.preventDefault()

    const modelYear = e.target.value
    
    for (let i = 0; i < vehicles.length; i++) {
      if (vehicles[i].model_year === modelYear && !makesByYear.includes(vehicles[i].manufacturer_name)) {
        makesByYear.push(vehicles[i].manufacturer_name);
        }
      }
      console.log('makesByYear:', makesByYear)
  }

//   console.log('makes by year array:', makesByYear)
    
    // if (vehicles.length) {
    // const makesByYear = [];
  //   for (let i = 0; i < vehicles.length; i++) {
  //     if (!makesByYear.includes(vehicles[i].manufacturer_name)) {
  //       makesByYear.push(vehicles[i].manufacturer_name);
  //     }
  //   }
  // }

  // if (vehicles.length) {
  //   for (let i = 0; i < vehicles.length; i++) {
  //     if (vehicles[i].id === latestVehicles[i].id) {
        // setVehicles([{...vehicles, msrp : latestVehicles[i].msrp}])
        // console.log('each vehicle:', vehicles)
        // vehicles[i]["msrp"] = latestVehicles[i].msrp
      // }
    // }
    // console.log('spread vehicles:', vehicles)
  // }  

  // const modelsByMake = []; /* an array */
  // const selectModel = (e) => {
  //   e.preventDefault();

  //   for (let i = 0; i < vehicles.length; i++) {
  //     // console.log('vehicles in selectmodel:', vehicles[i])
  //     if (
  //       vehicles[i].manufacturer_name === e.target.value &&
  //       !modelsByMake.includes(vehicles[i].model)
  //     ) {
  //       // console.log('conditions met, adding..')
  //       modelsByMake.push(vehicles[i].model);
  //     }
  //   }
  //   // console.log('in selectModel; modelsByMake is:', modelsByMake)
  //   setSelectedModels(modelsByMake)
  // };

  // console.log('models by make outside:', modelsByMake)

// MSRP is dropped before here
  // const showChosenVehicle = (e) => {
  //   e.preventDefault();

  //   for (let i = 0; i < vehicles.length; i++) {
  //     // console.log('each vehicle in showchosenvehicle:', vehicles[i])
  //     if (vehicles[i].model === e.target.value) {
  //       // console.log('in showChosenVehicle:', vehicles[i])
  //       chosenVehicle.push(vehicles[i])
  //       setChosenVehicle([vehicles[i]])
  //     }
  //   }
  // }
    
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
                // onChange={selectModel}
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
                // onChange={showChosenVehicle}
              >
                <option>-Select-</option>

                {/* {selectedModels.length
                  ? selectedModels.map((model) => (
                      <option key={uuidv4()} value={model}>
                        {model}
                      </option>
                    ))
                  : null} */}
              </select>
              <button onClick={(e) => {
                e.preventDefault()
                setDropdownsFulfilled(true)}
              }>Go</button>
{/* ===================================================================== */}
          </div>
          <div></div>
        </>
      {dropdownsFulfilled && !typeSelected ? (
        <SelectedVehicle vehicle={chosenVehicle} />
      ) : null}

        <br/>
        <br/>
        
        </>
    )
}

export default Dropdowns;