import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { excecuteJWTAuthenticationService } from "../api/AuthenticationApiService";

//1. Create Context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)
//const authContext = useContext(AuthContext)


//2.share the created context with other components

function AuthProvider({children}){

    //put some state in the Context
    const [isAuthenticated,setAuthenticated]= useState(false)

    const [username,setUsername]= useState(null)
    const [token,setToken]= useState(null)

//    function login(username,password){
//     if(username==="in28minutes" && password==="dummy"){
//         setAuthenticated(true)
//         setUsername(username)
//         return true
//     }else{
//        setAuthenticated(false)
//        setUsername(null)
//        return false
        
//     }
//    }

//    async function login(username,password){

//     const baToken = 'Basic ' + window.btoa(username + ":" + password)

//     try {
//         const response = await excecuteBasicAuthenticationService(baToken)
//         if(response.status==200){
//             setAuthenticated(true)
//             setUsername(username)
//             setToken(baToken)
//             apiClient.interceptors.request.use(
//                 (config) => {
//                     console.log('intercepting and adding a token')
//                     config.headers.Authorization = baToken
//                     return config
//                 }
//             )
//             return true
//         }else{
//             logout()
//             return false
            
//         }
//     } catch (error) {
//         logout()
//         return false
//     }
    
//    }

   async function login(username,password){

    //const baToken = 'Basic ' + window.btoa(username + ":" + password)

    try {
        const response = await excecuteJWTAuthenticationService(username,password)
        const jwtToken = 'Bearer '+ response.data.token
        if(response.status==200){
            setAuthenticated(true)
            setUsername(username)
            setToken(jwtToken)
            apiClient.interceptors.request.use(
                (config) => {
                    console.log('intercepting and adding a token')
                    config.headers.Authorization = jwtToken
                    return config
                }
            )
            return true
        }else{
            logout()
            return false
            
        }
    } catch (error) {
        logout()
        return false
    }
    
   }

   function logout(){
    setAuthenticated(false)
    setUsername(null)
    setToken(null)
   }

    return (
        <AuthContext.Provider value={{isAuthenticated,login,logout,username,token}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider