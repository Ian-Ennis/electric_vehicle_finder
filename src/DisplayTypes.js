import { useState } from 'react'
import { v4 as uuidv4 } from "uuid";


function DisplayVehicles({data}) {
  const [vehiclesDisplayed, setVehiclesDisplayed] = useState([]);
  
  const yearsArray = [];
  const vehiclesArray = [];
  
  const handleChange = (e) => {
    const checked = e.target.checked;
    const currentYear = e.target.value;


    if (checked) {
      // Add years to years array ['2023', '2022', '2021']
      yearsArray.push(currentYear);


    // Add vehicles to vehiclesArray for selected years, if not already in the array
    for (let i = 0; i < data.length; i++) {
      let modelYear = data[i].model_year

      if (yearsArray.includes(modelYear) && !vehiclesArray.includes(data[i])) {
        vehiclesArray.push(data[i])
      } 
    }
    console.log('upper vehicles array:', vehiclesArray)
    // setVehiclesDisplayed(vehiclesArray)
    // console.log('upper state:', vehiclesDisplayed)

    } else {

      // When box previously checked becomes unchecked...
      if (yearsArray.length) {


      // Remove years from years array ['2023', '2021']
        for (let i = 0; i < yearsArray.length; i++) {
          if (yearsArray[i] === currentYear) {
            const index = yearsArray.indexOf(currentYear);
            yearsArray.splice(index, 1);
          }
        }


        // Remove irrelevant vehicle years from vehicles array
        for (let i = 0; i < data.length; i++) {
          let modelYear = data[i].model_year

          if (!yearsArray.includes(modelYear) && vehiclesArray.includes(data[i])) {
            const index = vehiclesArray.indexOf(data[i])
            vehiclesArray.splice(index, 1);
          }
        }
      }
      console.log('lower vehicles array:', vehiclesArray)
      // setVehiclesDisplayed(vehiclesArray)
      // console.log('lower state:', vehiclesDisplayed)
    }
  }

  // console.log('outer vehicles array:', vehiclesArray)


  return (
    <>
      <fieldset>
        <legend>Model Year</legend>

        <div>
          <label htmlFor="2023">2023</label>
          <input type="checkbox" name="checked_year" value="2023" onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="2022">2022</label>
          <input type="checkbox" name="checked_year" value="2022" onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="2021">2021</label>
          <input type="checkbox" name="checked_year"
            value="2021"
            onChange={handleChange}
          />
        </div>
      </fieldset>

      {vehiclesDisplayed.map((vehicle) => (
        <div id="each_vehicle" key={uuidv4()}>
          <strong style={{ display: "block" }}>
            {vehicle.manufacturer_name} {vehicle.model}
          </strong>
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
          <p style={{ display: "inline" }}>{vehicle.battery_capacity_kwh} </p>
          <strong style={{ display: "block" }}>Engine/Motor(s): </strong>
          <p style={{ display: "inline" }}>{vehicle.engine_size}</p>
          <strong style={{ display: "block" }}>Drivetrain: </strong>
          <p style={{ display: "inline" }}>{vehicle.drivetrain}</p>
        </div>
      ))}
    </>
  );
}

export default DisplayVehicles;