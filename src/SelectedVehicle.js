function SelectedVehicle({ vehicle }) {

    console.log('vehicle in selectedVehicle:', vehicle)
    
    return (
        <div id="specific_vehicle" >
            <strong style={{display: "block"}}>{vehicle[0].manufacturer_name} {vehicle[0].model}</strong>
            <img src={vehicle[0].photo_url} alt="vehicle_photo" /><p style={{display: "inline"}}></p>
            <strong style={{display: "block"}}>Alternative Fuel Economy (Combined)</strong><p style={{display: "inline"}}>{vehicle[0].alternative_fuel_economy_combined} MPGe</p>
            <strong style={{display: "block"}}>Electric-Only Range:</strong><p style={{display: "inline"}}>{vehicle[0].electric_range} Miles</p>
            {vehicle[0].charging_rate_level_2 ? 
              <><strong style={{display: "block"}}>Charging Rate:</strong><p style={{display: "inline"}}><em>Level 2: </em>{vehicle[0].charging_rate_level_2} | <em>DC Fast: </em>{vehicle[0].charging_rate_dc_fast}</p></>
                 : null}
            {vehicle[0].charging_speed_level_1 ? 
              <><strong style={{display: "block"}}>Charging Speed (per hour of charging):</strong><p style={{display: "inline"}}><em>Level 1: </em>{vehicle[0].charging_speed_level_1} | <em>Level 2: </em>{vehicle[0].charging_speed_level_2} | <em>DC Fast: </em>{vehicle[0].charging_speed_dc_fast}</p></>
                : null}
            <strong style={{display: "block"}}>Battery Capacity: </strong><p style={{display: "inline"}}>{vehicle[0].battery_capacity_kwh} kWh</p>
            <strong style={{display: "block"}}>Engine/Motor(s): </strong><p style={{display: "inline"}}>{vehicle[0].engine_size}</p>
            <strong style={{display: "block"}}>Drivetrain: </strong><p style={{display: "inline"}}>{vehicle[0].drivetrain}</p>
            <br/>
        </div>
    )
}

export default SelectedVehicle;