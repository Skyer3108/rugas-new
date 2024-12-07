import axios from "axios"
import { useContext, useState } from "react"
import { StoreContext } from "../../../Cotext/StoreContext"


const Report=({reportData,handleShow})=>{

    const {url}=useContext(StoreContext)

const [report,setReport]=useState({
    laptopId:reportData.laptopId._id,
    description:"",
    priority:"medium",
    reportedBy:reportData.employeeId


})

const handleReport=async()=>{

    try{

        let res=await axios.post(`${url}/api/issues/post-issue`,report)

        console.log(res)

        if(res){
            alert(res.data.message)
            window.location.reload()
        }

    }catch(err){

        alert(err.message)

    }
}

const handleChange=(e)=>{
    const { name, value } = e.target;
    setReport((prev) => ({
        ...prev,
        [name]: value,
    }));

}
console.log(report)
    console.log("REPORT",reportData)
    return(
        <div className='assign-popup'>

            <div className="assign-container">

              <input value={report.laptopId} placeholder="Enter Your LaptopId"/>
              <textarea name='description' value={report.description} onChange={handleChange} placeholder="Enter Description"/>
              <select name='priority' onChange={handleChange}>
              <option value='medium'>Medium</option>
    
                <option value='low'>Low</option>
                <option value='high'>High</option>


              </select>

                        <input value={report.reportedBy} placeholder="Enter Your LaptopId"/>

        

                <div>
                    <button onClick={handleReport} >Add Report</button>
                    <button onClick={handleShow} >Cancle</button>
                </div>



            </div>

        </div>
    )
}

export default Report