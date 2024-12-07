import { useContext, useState } from "react"
import './assign.css'
import axios from "axios"
import { StoreContext } from "../../../Cotext/StoreContext"

const AssignLaptop = ({ laptopsData, employees, showAssignLaptop }) => {

    console.log(laptopsData, employees)
    const { url } = useContext(StoreContext)

    const [assignData, setAssignDat] = useState({

        laptopId: '',
        employeeId: ""

    })


    const handleAssign = async () => {
        try {
            const res = await axios.post(`${url}/api/assign/assign-emp`, assignData)

            console.log(res)
            window.location.reload()

        } catch (err) {
            alert(err)
        }




    }
    const handleChange = (e) => {
        let name = e.target.name;

        console.log('name', name)
        let value = e.target.value
        console.log("val", value)
        setAssignDat({ ...assignData, [name]: value })





    }

    console.log(assignData)

    return (
        <div className='assign-popup'>

            <div className="assign-container">

                <select name='laptopId' onChange={handleChange}>
                    <option>--Select Laptop--</option>
                    {
                        laptopsData.map((val) => (
                            <option value={val._id}>{val.brand}</option>

                        ))
                    }
                </select>
                <select name='employeeId' onChange={handleChange} >
                    <option>--Select Employee--</option>

                    {
                        employees.map((val, ind) => (
                            <option value={val._id}>{val.name}</option>
                        ))
                    }
                </select>

                <div>
                    <button onClick={handleAssign}>Assign Laptop</button>
                    <button onClick={showAssignLaptop}>Cancle</button>
                </div>



            </div>

        </div>
    )
}

export default AssignLaptop