import { useState, useEffect } from "react";
import sedan from "./Images/sedan.jpeg";
import suv from "./Images/suv.jpeg";
import pickup from "./Images/pickup.jpeg";
import { v4 as uuidv4 } from "uuid";

const APIkey = `FWa7ECkCD7pV8HgIVkhHEKXfvBTbeo9ZI6bhRRY5`;

function EV() {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = (e, vehicleType, year = 2023) => {
    e.preventDefault();

    document.getElementById("vehicle_type_container").id =
      "vehicle_display_container";

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
  };

  const extraVehicleInfo = [
    {
    id: 13221,
    model: "e-tron GT/RS e-tron GT",
    msrp: "$104,900",
  },
]

  for (let i = 0; i < vehicles.length; i++) {
    // console.log('vehicles[i].id:', vehicles[i].id)
    // console.log('extraVehicleInfo[i].id:', extraVehicleInfo[i].id)
    if (extraVehicleInfo[i].id) {
      if ((vehicles[i].id === extraVehicleInfo[i].id) && (!vehicles[i].msrp)) {
        vehicles[i].msrp = extraVehicleInfo[i].msrp
        }
    }
    console.log(vehicles[0])
    }

  const goBack = (e) => {
    e.preventDefault()

    document.getElementById("vehicle_display_container").id =
    "vehicle_type_container";

    setVehicles([])
  }


  return (
    <>
    <button onClick={goBack}>go back</button>
      {!vehicles.length ? (
        <>
          <div>
            <h4>Search by specific vehicle</h4>
            <label htmlFor="automobiles">Model year: </label>
            <select
              name="automobiles"
              id="automobiles"
              form="automobile_form"
              onChange={fetchVehicles}
            >
              <option>select</option>
              <option value={"2023"}>2023</option>
              <option value={"2022"}>2022</option>
              <option value={"2021"}>2021</option>
            </select>

            <label htmlFor="automobiles">Make: </label>
            <select
              name="automobiles"
              id="automobiles"
              form="automobile_form"
              onChange={fetchVehicles}
            >
              <option value={"2023"}>2023</option>
              <option value={"2022"}>2022</option>
              <option value={"2021"}>2021</option>
            </select>

            <label htmlFor="automobiles">Model: </label>
            <select
              name="automobiles"
              id="automobiles"
              form="automobile_form"
              onChange={fetchVehicles}
            >
              <option value={"2023"}>2023</option>
              <option value={"2022"}>2022</option>
              <option value={"2021"}>2021</option>
            </select>
          </div>
          <div></div>
        </>
      ) : null}

      <br />
      <br />

      <div>
        <h4>Search by type</h4>

        <div id="vehicle_type_container">
          {!vehicles.length ? (
            <>
              <div onClick={(e) => fetchVehicles(e, 27)}>
                <h5>Sedan/ Wagon</h5>
                <img style={{ width: "40%" }} src={sedan} alt="sedan" />
              </div>
              <div onClick={(e) => fetchVehicles(e, 29)}>
                <h5>SUV</h5>
                <img style={{ width: "40%" }} src={suv} alt="sedan" />
              </div>
              <div onClick={(e) => fetchVehicles(e, 25)}>
                <h5>Pickup</h5>
                <img style={{ width: "40%" }} src={pickup} alt="sedan" />
              </div>
            </>
          ) : (
            vehicles.map((vehicle) => (
              <div id="each_vehicle" key={uuidv4()}>
                <strong style={{display: "block"}}>{vehicle.manufacturer_name} {vehicle.model}</strong>
                <img src={vehicle.photo_url} alt="vehicle_photo" /><p style={{display: "inline"}}></p>
                <strong style={{display: "block"}}>Alternative Fuel Economy (Combined)</strong><p style={{display: "inline"}}>{vehicle.alternative_fuel_economy_combined} MPGe</p>
                <strong style={{display: "block"}}>Electric-Only Range:</strong><p style={{display: "inline"}}>{vehicle.electric_range}</p>
                {vehicle.charging_rate_level_2 ? 
                  <><strong style={{display: "block"}}>Charging Rate:</strong><p style={{display: "inline"}}><em>Level 2: </em>{vehicle.charging_rate_level_2} | <em>DC Fast: </em>{vehicle.charging_rate_dc_fast}</p></>
                : null}
                {vehicle.charging_speed_level_1 ? 
                  <><strong style={{display: "block"}}>Charging Speed (per hour of charging):</strong><p style={{display: "inline"}}><em>Level 1: </em>{vehicle.charging_speed_level_1} | <em>Level 2: </em>{vehicle.charging_speed_level_2} | <em>DC Fast: </em>{vehicle.charging_speed_dc_fast}</p></>
                : null}
                  <strong style={{display: "block"}}>Battery Capacity: </strong><p style={{display: "inline"}}>{vehicle.battery_capacity_kwh} </p>
                  <strong style={{display: "block"}}>Engine/Motor(s): </strong><p style={{display: "inline"}}>{vehicle.engine_size}</p>
                  <strong style={{display: "block"}}>Drivetrain: </strong><p style={{display: "inline"}}>{vehicle.drivetrain}</p>
                <br/>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default EV;
