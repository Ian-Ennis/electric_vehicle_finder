import { v4 as uuidv4 } from "uuid";


function VehicleList({ selected, setSelected }) {

    const handleClick = (e, car) => {
        e.preventDefault();

        console.log('car:', car)


        for (let i = 0; i < selected.length; i++) {

            setSelected(selected.filter(car, i => {
                selected[i].id === car.id

            }
                ))
                
            // console.log('selected')
        }

    }

    const listItems = selected.map(car => {
        return (
            <div>
                <li>{car.model}</li>
                <button onClick={(e) => handleClick(e, car)}>Remove</button>
            </div>
        )
})

    return (
        <ul>{listItems}</ul>
    )
}

export default VehicleList
