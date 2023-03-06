import { useState, useEffect } from "react";
import sedan from "./Images/sedan.jpeg";
import suv from "./Images/suv.jpeg";
import pickup from "./Images/pickup.jpeg";
import DisplayTypes from "./DisplayTypes";
import Dropdowns from "./Dropdowns";


const APIkey = `FWa7ECkCD7pV8HgIVkhHEKXfvBTbeo9ZI6bhRRY5`;

function EV() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([])
  const [typeSelected, setTypeSelected] = useState(false);
  const [dropdownsFulfilled, setDropdownsFulfilled] = useState(false)


  const msrp = [
    {
      id: 13221,
      // year: 2023,
      // type: 29,
      // make: "Audi",
      // model: "e-tron GT/RS e-tron GT",
      msrp: 104900
    },
    {
      id: 13225,
      // year: 2023,
      // type: 29,
      // make: "BMW",
      // model: "i4 eDrive40 Gran Coupe",
      msrp: 56394
    },
    {
      id: 13226,
      // year: 2023,
      // type: 29,
      // make: "BMW",
      // model: "i4 M50 Gran Coupe",
      msrp: 67300
    },
    {
      id: 13227,
      // year: 2023,
      // type: 29,
      // make: "BMW",
      // model: "i7 xDrive60 Sedan",
      msrp: 119300
    },
    {
      id: 13111,
      // year: 2023,
      // type: 29,
      // make: "Chevrolet",
      // model: "Bolt EUV",
      msrp: 27200
    },
    {
      id: 13110,
      // year: 2023,
      // type: 29,
      // make: "Chevrolet",
      // model: "Bolt EV",
      msrp: 25600
    },
    {
      id: 13229,
      // year: 2023,
      // type: 29,
      // make: "Genesis",
      // model: "Electrified G80",
      msrp: 79825
    },
    {
      id: 13112,
      // year: 2023,
      // type: 29,
      // make: "Genesis",
      // model: "GV60 Advance",
      msrp: 58890
    },
    {
      id: 13113,
      // year: 2023,
      // type: 29,
      // make: "Genesis",
      // model: "GV60 Performance",
      msrp: 67890
    },
    {
      id: 13234,
      // year: 2023,
      // type: 29,
      // make: "Kia",
      // model: "EV6 AWD GT",
      msrp: 56400
    },
    {
      id: 13233,
      // year: 2023,
      // type: 29,
      // make: "Kia",
      // model: "EV6 Long Range AWD",
      msrp: 40900
    },
    {
      id: 13232,
      // year: 2023,
      // type: 29,
      // make: "Kia",
      // model: "EV6 Standard/Long Range RWD",
      msrp: 40900
    },
    {
      id: 13235,
      // year: 2023,
      // type: 29,
      // make: "Kia",
      // model: "Niro Electric",
      msrp: 39900
    },
    {
      id: 13307,
      // year: 2023,
      // type: 29,
      // make: "Lucid",
      // model: "Air G Touring XR AWD",
      msrp: 87400
    },
    {
      id: 13308,
      // year: 2023,
      // type: 29,
      // make: "Lucid",
      // model: "Air GT P AWD",
      msrp: 87400
    },
    {
      id: 13309,
      // year: 2023,
      // type: 29,
      // make: "Lucid",
      // model: "Air Pure AWD",
      msrp: 87400
    },
    {
      id: 13310,
      // year: 2023,
      // type: 29,
      // make: "Lucid",
      // model: "Air Touring AWD",
      msrp: 87400
    },
    {
      id: 13236,
      // year: 2023,
      // type: 29,
      // make: "Mercedes-Benz",
      // model: "EQS 450 4MATIC",
      msrp: 112800
    },
    {
      id: 13114,
      // year: 2023,
      // type: 29,
      // make: "Mini",
      // model: "Cooper SE Hardtop 2 door",
      msrp: 29900
    },
    {
      id: 13240,
      // year: 2023,
      // type: 29,
      // make: "Nissan",
      // model: "ARIYA ENGAGE FWD 63kWh",
      msrp: 47190
    },
    {
      id: 13241,
      // year: 2023,
      // type: 29,
      // make: "Nissan",
      // model: "ARIYA FWD 87kWh",
      msrp: 47190
    },
    {
      id: 13242,
      // year: 2023,
      // type: 29,
      // make: "Nissan",
      // model: "LEAF",
      msrp: 28040
    },
    {
      id: 13243,
      // year: 2023,
      // type: 29,
      // make: "Nissan",
      // model: "LEAF SV",
      msrp: 36040
    },
    {
      id: 13116,
      // year: 2023,
      // type: 29,
      // make: "Polestar Automotive USA",
      // model: "Polestar 2",
      msrp: 48400
    },
    {
      id: 13115,
      // year: 2023,
      // type: 29,
      // make: "Polestar Automotive USA",
      // model: "Polestar 2 Dual Motor",
      msrp: 51900
    },
    {
      id: 13245,
      // year: 2023,
      // type: 29,
      // make: "Porsche",
      // model: "Taycan AWD",
      msrp: 86700
    },
    {
      id: 13247,
      // year: 2023,
      // type: 29,
      // make: "Porsche",
      // model: "Taycan Cross Turismo",
      msrp: 86700
    },
    {
      id: 13244,
      // year: 2023,
      // type: 29,
      // make: "Porsche",
      // model: "Taycan GTS Sport Turismo",
      msrp: 86700
    },
    {
      id: 13246,
      // year: 2023,
      // type: 29,
      // make: "Porsche",
      // model: "Taycan Perf Battery/Battery Plus",
      msrp: 86700
    },
    {
      id: 13276,
      // year: 2023,
      // type: 29,
      // make: "Tesla",
      // // model: "Model 3 AWD",
      msrp: 46990
    },
    {
      id: 13275,
      // year: 2023,
      // type: 29,
      // make: "Tesla",
      // // model: "Model 3 RWD",
      msrp: 46990
    },
    {
      id: 13274,
      // year: 2023,
      // type: 29,
      // make: "Tesla",
      // // model: "Model S ",
      msrp: 104990
    },
    {
      id: 13219,
      // year: 2023,
      // type: 29,
      // make: "Audi",
      // model: "e-tron quattro/S",
      msrp: 65900
    },
    {
      id: 13220,
      // year: 2023,
      // type: 29,
      // make: "Audi",
      // model: "e-tron Sportback/S Sportback",
      msrp: 69100
    },
    {
      id: 13222,
      // year: 2023,
      // type: 29,
      // make: "Audi",
      // model: "Q4 e-tron",
      msrp: 49900
    },
    {
      id: 13223,
      // year: 2023,
      // type: 29,
      // make: "Audi",
      // model: "Q4 e-tron quattro",
      msrp: 49900
    },
    {
      id: 13224,
      // year: 2023,
      // type: 29,
      // make: "Audi",
      // model: "Q4 e-tron Sportback",
      msrp: 52700
    },
    {
      id: 13108,
      // year: 2023,
      // type: 29,
      // make: "BMW",
      // model: "iX M60",
      msrp: 108900
    },
    {
      id: 13228,
      // year: 2023,
      // type: 29,
      // make: "BMW",
      // model: "iX xDrive50",
      msrp: 83200
    },
    {
      id: 13109,
      // year: 2023,
      // type: 29,
      // make: "Cadillac",
      // model: "Lyric",
      msrp: 61795
    },
    {
      id: 13230,
      // year: 2023,
      // type: 29,
      // make: "Hyundai",
      // model: "Kona Electric",
      msrp: 34000
    },
    {
      id: 13231,
      // year: 2023,
      // type: 29,
      // make: "Jaguar",
      // model: "I-PACE EV400",
      msrp: 71300
    },
    {
      id: 13237,
      // year: 2023,
      // type: 29,
      // make: "Mercedes-Benz",
      // model: "EQS 450 4MATIC (SUV)",
      msrp: 104400
    },
    {
      id: 13238,
      // year: 2023,
      // type: 29,
      // make: "Mercedes-Benz",
      // model: "EQS 450+ (SUV)",
      msrp: 105500
    },
    {
      id: 13239,
      // year: 2023,
      // type: 29,
      // make: "Mercedes-Benz",
      // model: "EQS 580 4MATIC (SUV)",
      msrp: 125950
    },
    {
      id: 13319,
      // year: 2023,
      // type: 29,
      // make: "Rivian",
      // model: "R1S",
      msrp: 78000
    },
    {
      id: 13248,
      // year: 2023,
      // type: 29,
      // make: "Subaru",
      // model: "Solterra/Limited/Touring AWD",
      msrp: 44995
    },
    {
      id: 13227,
      // year: 2023,
      // type: 29,
      // make: "Tesla",
      // // model: "Model X",
      msrp: 120990
    },
    {
      id: 13278,
      // year: 2023,
      // type: 29,
      // make: "Tesla",
      // // model: "Model Y AWD",
      msrp: 65990
    },
    {
      id: 13117,
      // year: 2023,
      // type: 29,
      // make: "Toyota",
      // model: "bZ4X",
      msrp: 42000
    },
    {
      id: 13118,
      // year: 2023,
      // type: 29,
      // make: "Toyota",
      // model: "bZ4X AWD",
      msrp: 44080
    },
    {
      id: 13250,
      // year: 2023,
      // type: 29,
      // make: "Volkswagon",
      // model: "ID.4 AWD Pro/Pro S",
      msrp: 41230
    },
    {
      id: 13249,
      // year: 2023,
      // type: 29,
      // make: "Volkswagon",
      // model: "ID.4 S/Pro/Pro S",
      msrp: 41230
    },
    {
      id: 13119,
      // year: 2023,
      // type: 29,
      // make: "Volvo",
      // model: "C40 Recharge Twin",
      msrp: 55300
    },
    {
      id: 13120,
      // year: 2023,
      // type: 29,
      // make: "Volvo",
      // model: "XC40 Recharge Twin",
      msrp: 53550
    },
    {
      id: 13317,
      // year: 2023,
      // type: 25,
      // make: "Ford",
      // model: "F150 Lightning 4WD",
      msrp: 55974
    },
    {
      id: 13318,
      // year: 2023,
      // type: 25,
      // make: "Rivian",
      // model: "R1T",
      msrp: 73000
    },
  ]


  useEffect(() => {
    fetch(
      `https://developer.nrel.gov/api/vehicles/v1/light_duty_automobiles.json?api_key=${APIkey}&category_id=27%2C29%2C25&fuel_id=41&model_year=2021%2C2022%2C2023`
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
  }, []);


  const pullVehicles = (e) => {
    e.preventDefault()

    if (e.target.alt === "sedan_icon") {
      const sedans = [];
      for (let i = 0; i < vehicles.length; i++) {
        if (vehicles[i].light_duty_category_id === 27) {
          sedans.push(vehicles[i])
          setSelectedVehicles(sedans)
          setTypeSelected(true)
        }
      }
    } else if (e.target.alt === "suv_icon") {
      const suvs = [];
      for (let i = 0; i < vehicles.length; i++) {
        if (vehicles[i].light_duty_category_id === 29) {
          suvs.push(vehicles[i])
          setSelectedVehicles(suvs)
          setTypeSelected(true)
        }
      }
    } else if (e.target.alt === "pickup_truck_icon") {
      const pickups = [];
      for (let i = 0; i < vehicles.length; i++) {
        if (vehicles[i].light_duty_category_id === 25) {
          pickups.push(vehicles[i])
          setSelectedVehicles(pickups)
          setTypeSelected(true)
        }
      }
    }
  }


  const goBack = (e) => {
    e.preventDefault()
  
    if (document.getElementById("vehicle_display_container"))
    document.getElementById("vehicle_display_container").id =
    "vehicle_type_container";
  
    setDropdownsFulfilled(false)
    setTypeSelected(false)
  }


  return (
    <>
      {!typeSelected ? (
        <Dropdowns
          vehicles={vehicles}
          dropdownsFulfilled={dropdownsFulfilled}
          setDropdownsFulfilled={setDropdownsFulfilled}
          typeSelected={typeSelected}
        />
      ) : null}


      <button onClick={goBack}>go back</button>
        <div id="vehicle_type_container">
          {!typeSelected ? (
            <>
              <h4>Search by type</h4>
              <div onClick={(e) => pullVehicles(e, 27)}>
                <h5>Sedan/ Wagon</h5>
                <img style={{ width: "40%" }} src={sedan} alt="sedan_icon" />
              </div>
              <div onClick={(e) => pullVehicles(e, 29)}>
                <h5>SUV</h5>
                <img style={{ width: "40%" }} src={suv} alt="suv_icon" />
              </div>
              <div onClick={(e) => pullVehicles(e, 25)}>
                <h5>Pickup</h5>
                <img
                  style={{ width: "40%" }}
                  src={pickup}
                  alt="pickup_truck_icon"
                />
              </div>
            </>
          ) : (
            <DisplayTypes data={selectedVehicles} />
          )}
        </div>

      <br />
      <br />

    </>
  );
}

export default EV;
