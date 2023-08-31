import { apiClient } from './ApiClient';

// export const excecuteBasicAuthenticationService
//     = (token) => apiClient.get(`/basicauth`,{
//         headers:{
//             Authorization: token
//         }
//     })

    export const excecuteJWTAuthenticationService
    = (username,password) => apiClient.post(`/authenticate`,{username,password})