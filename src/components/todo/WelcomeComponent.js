import {useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { retrieveHelloWorldBean, retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

function WelcomeComponent(){

    const {username} = useParams()
    const [message,setMessage]= useState(null)

    const authContext =useAuth()

    function callHelloWorldRestAPI(){
        console.log('called')

        //axios
        // axios.get('http://localhost:8080/hello-world')
        // .then((response) => successfulResponse(response))
        // .catch((error) => errorResponse(error))
        // .finally(() => console.log('cleanup'))

        //axios
        //axios.get('http://localhost:8080/hello-world-bean')

        // retrieveHelloWorldBean()
        //     .then((response) => successfulResponse(response))
        //     .catch((error) => errorResponse(error))
        //     .finally(() => console.log('cleanup'))

        retrieveHelloWorldPathVariable('Aniruddh',authContext.token)
            .then((response) => successfulResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => console.log('cleanup'))

        
    }

    function successfulResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error){
        console.log(error)
    }

    return (
        <div className='WelcomeComponent'>
        <h1>Welcome {username}.</h1>
        <div >
            Manage Your Todos. <Link to='/todos'> Go Here</Link>
        </div>
        <div>
            <button className="btn btn-success m-5" onClick={callHelloWorldRestAPI}>Call Hello WORLD</button>
        </div>
        <div className='text-info'>{message}</div>
        </div>
    )
}

export default WelcomeComponent