
import axios from 'axios'
import './laptops.css'
import { useContext,useState } from 'react'
import { StoreContext } from '../../../Cotext/StoreContext'

const LaptopList = ({ lists ,showUpdate,setEditLaptoData}) => {

    const { url } = useContext(StoreContext)

  


    const handelDelete = async (id) => {

        let token=localStorage.getItem('token')

        try {

            const res = await axios.delete(`${url}/api/laptop/${id}`,{
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log('Dlelte', res)
            if (res) {
                alert("Laptop deleted successfully!");
                window.location.reload();
            } else {
                alert(res)
            }

        } catch (err) {

            alert(err.messgae)
        }

    }


   

    console.log(lists)
    return (
        <div className='lap'>

           
            <h1>Laptops List</h1>

            <div className='list-table'>
                <div className="list-table-formate title">
                    <b>Brand</b>
                    <b>Model</b>
                    <b>SerialNumber</b>
                    <b>Status</b>
                    <b>Action</b>
                </div>

                {
                    lists?.map((val, ind) => (
                        <div key={ind} className='list-table-formate'>
                            <p>{val.brand}</p>
                            <p>{val.model}</p>
                            <p>{val.serialno}</p>
                            <p>{val.status}</p>

                            <div>
                                <button onClick={()=>{ setEditLaptoData(val) ;showUpdate();}}>Update</button>
                                <button onClick={() => handelDelete(val._id)}>Delete</button>


                            </div>


                        </div>
                    ))
                }

            </div>

        </div>

    )
}

export default LaptopList