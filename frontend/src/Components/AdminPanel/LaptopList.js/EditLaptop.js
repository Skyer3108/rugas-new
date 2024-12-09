
import axios from 'axios'
import './editlaptop.css'
import { useContext ,useState} from 'react'
import { StoreContext } from '../../../Cotext/StoreContext'
const EditLaptop = ({ showUpdate,editLaptopData }) => {
    const {url}=useContext(StoreContext)

    const [newData,setNewData]=useState({
        brand:editLaptopData?.brand||'',
        model:editLaptopData?.model||'',
        serialno:editLaptopData?.serialno||'',
        status:editLaptopData?.status||''

    })


    const handleChange=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setNewData({
            ...newData,
            [name]:value
        })

    }

    console.log(newData)

    
const handleUpdate=async()=>{

   let token=localStorage.getItem('token')
try{
    const res=await axios.put(`${url}/api/laptop/${editLaptopData._id}`,newData,{
        headers: { Authorization: `Bearer ${token}` }
    })
   if(res.status==200){
    alert('Laptop updated successfully!')
    window.location.reload();
   }
}
  catch(err){

    alert(err.message)
  }

}

    return (
        <div className="edit-popup">

            <div className="edit-container">
                <h1>Edit Laptop</h1>

                <input name='brand' value={newData.brand} type='text' placeholder="Enter Name" onChange={handleChange}/>
                <input name='model' value={newData.model} type='text' placeholder="Enter Model" onChange={handleChange} />
                <input name='serialno' value={newData.serialno} type='text' placeholder="Enter Serial No" onChange={handleChange} />
                <input name='status' value={newData.status} type='text' onChange={handleChange}/>

                <div className='btn'>
                    <button className='btn-1' onClick={showUpdate}>Cancel</button>
                    <button className='btn-2' onClick={handleUpdate}>Save Changes</button>
                </div>


            </div>




        </div>
    )
}

export default EditLaptop