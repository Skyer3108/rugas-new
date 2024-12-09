import { useContext, useState } from "react";
import { StoreContext } from "../../Cotext/StoreContext";
import axios from "axios";

const AddLaptop = ({ addLaptop }) => {


    const [laptop, setLaptop] = useState({
        brand: "",
        model: "",
        serialno: "",
        status: "available",
        purcheseData: ""
    })

    const { url } = useContext(StoreContext)

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;


        setLaptop({ ...laptop, [name]: value })
        console.log(laptop)

    }

    const handleLaptop = async () => {

        let token=localStorage.getItem('token')
        console.log("TOKEN",token)
       
console.log(laptop)
        let res = await axios.post(`${url}/api/laptop/post-loptop`, laptop,{
            headers: { Authorization: `Bearer ${token}` }
        })

        console.log("Add",res)

        if (res.data.status == 201) {

            alert('Laptop Added')
            window.location.reload()
        }
        else {
            alert(res.message)
        }



    }

    return (
        <div className='login-popup'>






            <div className="login-popup-container">

                <div className="login-pop-tittle">
                    <h1>Add Laptop</h1>
                </div>

                <input name='brand' type='text' value={laptop.brand} onChange={handleChange} placeholder='Enter Brand Name' />
                <input name='model' value={laptop.model} type='text' onChange={handleChange} placeholder='Enter Model Name' />
                <input name='serialno' value={laptop.serialno} type='text' onChange={handleChange} placeholder='Enter Serial Number' />
                {/* <input type='text' placeholder='Enter '/> */}
                <input name='purcheseData' value={laptop.purcheseData} type='date' onChange={handleChange} />

                <button  onClick={handleLaptop} >Add Laptop</button>
            <button onClick={addLaptop}>Cancel</button>

                
            </div>

           
        </div>




    )

}
export default AddLaptop