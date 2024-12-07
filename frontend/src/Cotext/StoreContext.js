import {createContext, useState,useEffect} from 'react'
import axios from  'react'
export const StoreContext=createContext()
const ContextStore=(props)=>{

    const url='https://rugas-backend-new.onrender.com'

    const [token,setToken]=useState('')


    useEffect(()=>{

       
        async function loadData(){


            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'))
    
            }
        
        
        }
        loadData()

    },[])


    

    const contextValue={url,token,setToken}

    return(
       <StoreContext.Provider value={contextValue}>

        {props.children}
       </StoreContext.Provider>
    )
}

export default ContextStore
