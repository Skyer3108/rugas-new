import { useContext, useState } from "react"
import { StoreContext } from "../../Cotext/StoreContext"
import { useNavigate } from "react-router-dom";
import './login.css'

import axios from 'axios'
const LoginPopUp = () => {

    const [currentState, setCurrentState] = useState('Register')

    const { url, setToken } = useContext(StoreContext)
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        department: "",
        role: "employee"
    })




    const onLogin = async (e) => {

      
        e.preventDefault();
        

        let newUrl =currentState==='Login'?`${url}/api/user/login`:`${url}/api/user/register`

        try{

            let res = await axios.post(newUrl, data)

            console.log("HELLO",res.data)
             
            if (res.data.status===200) {


                setToken(res.data.token)
                console.log(res,"1")
                localStorage.setItem('token', res.data.token)
                localStorage.setItem("role", res.data.role);
                localStorage.setItem("id", res.data.id);

                alert('User login sucessfully')
            navigate(res.data.role === "admin" ? "/admin-panel" : "/employee-panel")
               
            
            } else {

                console.log('ERRORRR')
                alert(res.data.message)
            }

        }catch(err){
       alert('an Error occured. pLease try again')
        }
        


        
    }


    const onHanldeChnage = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setData((predata) => ({ ...predata, [name]: value }))

    }
    return (
        <div className='login-popup'>

            <form onSubmit={onLogin} action="" className="login-popup-container">

                <div className="login-pop-tittle">
                    <h1>{currentState}</h1>
                </div>

                <div className='login-popup-input'>
                    {currentState === 'Register' ? <input name='name' type='text' onChange={onHanldeChnage} value={data.name} placeholder='Enter Your Name' required /> : <></>}


                    <input name='email' type='email' onChange={onHanldeChnage} value={data.email} placeholder='Enter Your Email' required />
                    <input name='password' type='password' onChange={onHanldeChnage} value={data.password} placeholder='Enter Your Password' required />
                    {currentState === 'Register' ? <input name='department' type='text' onChange={onHanldeChnage} value={data.department} placeholder='Enter Your Department' required /> : <></>}
                    {
                        currentState === 'Register' ? <select name='role' value={data.role} onChange={onHanldeChnage} >

                            <option value='admin'>Admin</option>
                            <option value='employee'>Employee</option>

                        </select> : ""}



                        <button type='submit'>{currentState === 'Register' ? "Create Account" : "Login"}</button>
                    <div>
                        {
                            currentState === 'Register' ? <p>Already have a account ? <span onClick={() => setCurrentState('Login')}>Login Here</span></p> : <p>Create a new Accout ?<span onClick={() => setCurrentState('Register')}>Click Here</span></p>
                        }
                    </div>


                </div>



            </form>

        </div>
    )
}

export default LoginPopUp