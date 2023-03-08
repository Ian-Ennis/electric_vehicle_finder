import { useState, useRef } from 'react'
import VehiclesDisplayed from './VehiclesDisplayed';

function DisplayVehicles({ data }) {
  const [vehiclesDisplayed, setVehiclesDisplayed] = useState([])

  const vehicles = useRef([]);
  const years = useRef([]);

  
  const handleChange = (e) => {
    const currentYear = e.target.value;
    const checked = e.target.checked;
    
    if (checked) {
      // Add years to years array ['2023', '2022', '2021']
      years.current.push(currentYear)
      years.current.sort().reverse()

      // Add vehicles for selected years, if not already in the array
      for (let i = 0; i < data.length; i++) {
        const vehicle = data[i];
        let modelYear = data[i].model_year;

        if (years.current.includes(modelYear) && !vehicles.current.includes(vehicle)) {
          vehicles.current.push(vehicle)
        }
      }
      
      vehicles.current.sort(
        (y1, y2) => (y1.model_year < y2.model_year) ? 1 : (y1.model_year > y2.model_year) ? -1 : 0
      )
      setVehiclesDisplayed([...vehicles.current])


    } else {
      // When box previously checked becomes unchecked...
      if (years.current.length) {
        // Remove years from years array ['2023', '2021']
        for (let i = 0; i < years.current.length; i++) {
          if (years.current[i] === currentYear) {
            const index = years.current.indexOf(currentYear);
            years.current.splice(index, 1);
          }
        }
        years.current.sort().reverse()


        // Remove irrelevant vehicle years from vehicles array
        for (let i = 0; i < data.length; i++) {
          let modelYear = data[i].model_year;

          if (!years.current.includes(modelYear) && vehicles.current.includes(data[i])) {
            const index = vehicles.current.indexOf(data[i]);
            vehicles.current.splice(index, 1);
          }
        }

        vehicles.current.sort(
          (y1, y2) => (y1.model_year < y2.model_year) ? 1 : (y1.model_year > y2.model_year) ? -1 : 0
        )
        setVehiclesDisplayed([...vehicles.current])
      }
    }
  };


  return (
    <>
      <div id="vehicles_displayed_container">
        <VehiclesDisplayed cars={vehiclesDisplayed} />
      </div>

      <div id="checkbox container">
        <fieldset>
          <legend>Model Year</legend>

          <div>
            <label htmlFor="2023">2023</label>
            <input
              type="checkbox"
              name="checked_year"
              value="2023"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="2022">2022</label>
            <input
              type="checkbox"
              name="checked_year"
              value="2022"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="2021">2021</label>
            <input
              type="checkbox"
              name="checked_year"
              value="2021"
              onChange={handleChange}
            />
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default DisplayVehicles;