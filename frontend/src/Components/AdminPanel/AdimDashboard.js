import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../../Cotext/StoreContext"
import axios from "axios"
import AddLaptop from "./AddLaptop"
import './admin.css'
import LaptopList from "./LaptopList.js/LaptopLists"
import EditLaptop from "./LaptopList.js/EditLaptop"
import AssignLaptop from "./AssignLaptop/AssignLaptop"
import EmpDetails from "./EmpDetails/EmpDetails"
const AdminDashboard = () => {

    const [showAddLap, setShowAddLap] = useState(false)

    const [showUpdateFields,setShowUpdate]=useState(false)

    const [showAssignLaptop,setShowAssignLaptop]=useState(false)


    const [editLaptopData,setEditLaptoData]=useState(null);

    const { url } = useContext(StoreContext)
    const [laptopsData, setLaptopData] = useState({
        totalLaptops: 0,
        availableLaptops: 0,
        assignedLaptops: 0,
        maintenanceLaptops: 0,
        loptops: []
    })

    const [employees,setEmployees]=useState()
    const addLaptop = () => {
        console.log('addbtn')
        setShowAddLap(!showAddLap)
    }

    const assignLaptop=()=>{
   setShowAssignLaptop(!showAssignLaptop)
    }


    const handleLogout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem("role");
        localStorage.removeItem("id");
        window.location.reload()
    }

    const showUpdate=()=>{

        setShowUpdate(!showUpdateFields)
    }
    console.log("DATA LAPTOPS",laptopsData.data)

    useEffect(() => {

        const getLaptops = async () => {
            let res = await axios.get(`${url}/api/laptop/get-loptop`)
            console.log('DATA', res.data)
            setLaptopData(res.data)

        }

        getLaptops()
    }, [])

    useEffect(()=>{

        const getEmployees=async()=>{

            let res=await axios.get(`${url}/api/user/getallemployees`)

            console.log("Get all employees",res.data.data)

            setEmployees(res.data.data)

        }
        getEmployees()


    },[])

    return (
        <div>
            {

                showAddLap ? <AddLaptop addLaptop={addLaptop} /> : ""}

{
                showUpdateFields?<EditLaptop showUpdate={showUpdate} editLaptopData={editLaptopData} />:""
            }

            {
  showAssignLaptop?<AssignLaptop showAssignLaptop={assignLaptop} laptopsData={laptopsData.data} employees={employees} />:""
            }

            <div className='admin'>


<div className="nav">
<h1>Admin Dahboard</h1>
<button onClick={handleLogout}>Logout</button>
</div>
                



                <div className="btns">

                    <div onClick={addLaptop} className="add-laptop add-btn-1 list-btn">
                        Add Laptop

                    </div>
                    <div onClick={assignLaptop} className="add-laptop add-btn-2 list-btn">
                        Assign Laptop

                    </div> 
                     {/* <div onClick={addLaptop} className="add-laptop add-btn-3 list-btn">
                        View Request 

                    </div>
                    <div onClick={addLaptop} className="add-laptop add-btn-4 list-btn">
                     Create Request 

                    </div> */}

                    
                </div>


                <div className="laptop-card">
                    <div className="card">
                        <p>Total Laptops</p>
                        <p>{laptopsData.totalLaptops}</p>
                    </div>
                    <div className="card">
                        <p>Assigned Laptops</p>
                        <p>{laptopsData.assignedLaptops}</p>

                    </div><div className="card">
                        <p>Available Laptops</p>
                        <p>{laptopsData.availableLaptops}</p>

                    </div><div className="card">
                        <p>Under Maintenance</p>
                        <p>{laptopsData.maintenanceLaptops}</p>

                    </div>


                </div>
 
 <EmpDetails/>

               <LaptopList  setEditLaptoData={setEditLaptoData} lists={laptopsData.data} showUpdate={showUpdate}/>
            </div>

        </div>
    )
}

export default AdminDashboard