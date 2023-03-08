import { useState } from 'react'
import VehicleList from './VehicleList';
import Highchart from './Highchart';
import { v4 as uuidv4 } from "uuid";

function VehiclesDisplayed({ cars }) {
  const [comparisonVehicles, setComparisonVehicles] = useState([])

  function chooseVehicle(e, vehicle) {
    e.preventDefault();

    setComparisonVehicles([...comparisonVehicles, vehicle])
  }

  return (
    <>
      {comparisonVehicles.length ? 
      <>
        <VehicleList selected={comparisonVehicles} setSelected={setComparisonVehicles} />
        <Highchart selected={comparisonVehicles} /> 
      </>
      : null}

      {cars
        ? cars.map((vehicle) => (
            <div id="each_vehicle" key={uuidv4()}>

              <div className="vehicle_select_container">
                <strong style={{ display: "block" }}>
                  {vehicle.manufacturer_name} {vehicle.model}
                </strong>
                <button onClick={(e) => chooseVehicle(e, vehicle)}>Select</button>
              </div>

              <img src={vehicle.photo_url} alt="vehicle_photo" />
              <p style={{ display: "inline" }}></p>
              <strong style={{ display: "block" }}>
                Alternative Fuel Economy (Combined)
              </strong>
              <p style={{ display: "inline" }}>
                {vehicle.alternative_fuel_economy_combined} MPGe
              </p>
              <strong style={{ display: "block" }}>Electric-Only Range:</strong>
              <p style={{ display: "inline" }}>{vehicle.electric_range}</p>
              {vehicle.charging_rate_level_2 ? (
                <>
                  <strong style={{ display: "block" }}>Charging Rate:</strong>
                  <p style={{ display: "inline" }}>
                    <em>Level 2: </em>
                    {vehicle.charging_rate_level_2} | <em>DC Fast: </em>
                    {vehicle.charging_rate_dc_fast}
                  </p>
                </>
              ) : null}
              {vehicle.charging_speed_level_1 ? (
                <>
                  <strong style={{ display: "block" }}>
                    Charging Speed (per hour of charging):
                  </strong>
                  <p style={{ display: "inline" }}>
                    <em>Level 1: </em>
                    {vehicle.charging_speed_level_1} | <em>Level 2: </em>
                    {vehicle.charging_speed_level_2} | <em>DC Fast: </em>
                    {vehicle.charging_speed_dc_fast}
                  </p>
                </>
              ) : null}
              <strong style={{ display: "block" }}>Battery Capacity: </strong>
              <p style={{ display: "inline" }}>
                {vehicle.battery_capacity_kwh}{" "}
              </p>
              <strong style={{ display: "block" }}>Engine/Motor(s): </strong>
              <p style={{ display: "inline" }}>{vehicle.engine_size}</p>
              <strong style={{ display: "block" }}>Drivetrain: </strong>
              <p style={{ display: "inline" }}>{vehicle.drivetrain}</p>
            </div>
          ))
        : null}
    </>
  );
}

export default VehiclesDisplayed;