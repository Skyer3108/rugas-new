import { useContext, useEffect,useState } from "react"
import { StoreContext } from "../../../Cotext/StoreContext"
import axios from "axios"


const EmpDetails=()=>{

    const {url}=useContext(StoreContext)

    const [employes,setEmployess]=useState()

    useEffect(()=>{

        let fetchData=async()=>{


            let res=await axios.get(`${url}/api/user/getallemployees`);
            console.log("EMPDETAILS",res)
            setEmployess(res.data.data)
        }

        fetchData()

    },[])

    return (
        <div className="lap">

           
            <h1>Employees List</h1>

            <div className='list-table'>
                <div className="list-table-formate-emp title">
                    <b>Name</b>
                    <b>Email</b>
                    <b>Role</b>
                   
                </div>

                {
                    employes?.map((val, ind) => (
                        <div key={ind} className='list-table-formate-emp'>
                            <p>{val.name}</p>
                            <p>{val.email}</p>
                            <p>{val.role}</p>
                            <p>{val.status}</p>
                        </div>
                    ))
                }

            </div>

        </div>
    )

}
export default EmpDetails