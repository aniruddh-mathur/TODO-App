import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';
function LoginComponent(){

    const [username,setUsername] = useState('in28minutes')
    const [password,setPassword] = useState('')
    const [showErorMessage,setshowErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()

    function handleUserNameChange(event){
        //console.log(event.target.value)
        setUsername(event.target.value)
    }

    function handlePasswordChange(event){
        //console.log(event.target.value)
        setPassword(event.target.value)
    }

    async function handleSubmit(event){
        console.log(username)
        console.log(password)
        if(await authContext.login(username,password)){
            navigate(`/welcome/${username}`)
        }else{
            setshowErrorMessage(true)
        }
    }

    return(
        <div className="Login">
            <h1>Time to Login!</h1>
            {showErorMessage &&  <div className='errorMessage'>Authentication Failed. Please check credentials</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUserNameChange}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}></input>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
            </div>
    )
}

export default LoginComponent