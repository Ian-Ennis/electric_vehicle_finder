function SelectedVehicle({ vehicle }) {
    
    console.log('chosen vehicle in selected vehicle:', vehicle)

    return (
        <div id="each_vehicle" >
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
    )
}

export default SelectedVehicle;