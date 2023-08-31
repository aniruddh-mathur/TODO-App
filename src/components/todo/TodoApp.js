import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './TodoApp.css'
import LogoutComponent from './LogoutComponent';
import HeaderComponent from './HeaderComponent';
import ListTodosComponent from './ListTodosComponent';
import ErrorComponent from './ErrorComponent';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';
import AuthProvider, { useAuth } from './security/AuthContext';
import TodoComponent from './TodoComponent';

function AuthenticatedRoute({children}){

    const authContext = useAuth()
    if(authContext.isAuthenticated){
        return children
    }
    return <Navigate to='/'></Navigate>
    
}
function TodoApp(){
return (
    <div className="ToDoApp">
        <AuthProvider>
        <BrowserRouter>
        <HeaderComponent></HeaderComponent>
        <Routes>
        <Route path='/' element={<LoginComponent></LoginComponent>}></Route>
            <Route path='/login' element={<LoginComponent></LoginComponent>}></Route>
            
            <Route path='/welcome/:username' element={
                <AuthenticatedRoute>
                <WelcomeComponent></WelcomeComponent>
                </AuthenticatedRoute>
                }></Route>
            
            <Route path='/todos' element={ 
            <AuthenticatedRoute>
            <ListTodosComponent></ListTodosComponent>
            </AuthenticatedRoute>
            }></Route>

            <Route path='/todo/:id' element={ 
            <AuthenticatedRoute>
            <TodoComponent></TodoComponent>
            </AuthenticatedRoute>
            }></Route>
            
            <Route path='/logout' element={ 
            <AuthenticatedRoute>
            <LogoutComponent></LogoutComponent>
            </AuthenticatedRoute>
            }></Route>

            <Route path='/*' element={ <ErrorComponent></ErrorComponent>}></Route>
        </Routes>
        </BrowserRouter>
        </AuthProvider>
    </div>
);
}

export default TodoApp
