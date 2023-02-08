import { useState } from 'react'
import { v4 as uuidv4 } from "uuid";


function DisplayVehicles({vehicles}) {
  const [selectedYears, setSelectedYears] = useState([])


  const yearsArray = [];

  const handleChange = (e) => {

    const checked = e.target.checked
    const currentYear = e.target.value

    if (checked) {
        yearsArray.push(currentYear)
        console.log('years array:', yearsArray)
    } 
    else {
      if (yearsArray.length) {
        for (let i = 0; i < yearsArray.length; i++) {
          if (yearsArray[i] === currentYear) {
            console.log('its in there')
            const index = yearsArray.indexOf(currentYear)
            console.log('index of year:', index)
            yearsArray.splice(index, 1)
          } else console.log('its not in there')
        }
      }
    }
    console.log('years array:', yearsArray)
  }

    return (
      <>
        <fieldset>
          <legend>Model Year</legend>

          <div>
            <label htmlFor="2023">2023</label>
            <input type="checkbox" className="checkbox" name="checked_year" value="2023" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="2022">2022</label>
            <input type="checkbox" className="checkbox" name="checked_year" value="2022" onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="2021">2021</label>
            <input type="checkbox" className="checkbox" name="checked_year" value="2021" onChange={handleChange}/>
          </div>

        </fieldset>
      </>
    );
}

export default DisplayVehicles;