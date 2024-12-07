import { useContext, useEffect,useState } from 'react'
import './emp.css'
import axios from 'axios'
import { StoreContext } from '../../Cotext/StoreContext'
import Report from './Report/Report'

const EmployeeDashBoard = () => {

    const { url } = useContext(StoreContext)
const [assigned,setAssigned]=useState(null)
const [reportData,setReportData]=useState()

const [reportShow,setReportShow]=useState(false)



const handleLogout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem("role");
    localStorage.removeItem("id");

    alert('Logout sucessfully')
    window.location.reload()
    
}
const handleShow=()=>{
    setReportShow(!reportShow)
}

const handleReport=(val)=>{
    setReportData(val)
console.log('REPORT',val)
  
}

    useEffect(() => {

        const id = localStorage.getItem('id')
        console.log('IDOOO', id)

        
        const laptopDetails = async () => {

            const res = await axios.get(`${url}/api/assign/assign-emp/${id}/laptops`)

           
            setAssigned(res.data.data)

        }
        if (id) {
            laptopDetails()
        }


    }, [])

    console.log(assigned)
    return (
        <div className="main">
            {
                reportShow?<Report reportData={reportData} handleShow={handleShow}/>:""
            }


            <div className='nav'>
            <h1>Employee</h1>
            <div className='left'>
                <h2>BOPPANI</h2>
                <button className='btn-1'>Report</button>

                
                <button onClick={handleLogout} className='btn-2'>Log OUt</button>
            </div>
            </div>
            

            <div className='assign-details'>
                Assigned Laptop Details

                <div className='assign'>
                {
                        assigned?.map((val,index)=>(
                            <div key={index} className='assign-laptop'>
                                <p>Brand : {val.laptopId.brand}</p>
                                <p>Model : {val.laptopId.model}</p>
                                <p>Serial No : {val.laptopId.serialno}</p>


                                <button onClick={()=>{
                                    handleShow()
                                    handleReport(val)}} className='btn-1'>Report</button>
                                </div>
                        ))
                    }
                </div>
                   


              
            </div>


        </div>
    )
}

export default EmployeeDashBoard