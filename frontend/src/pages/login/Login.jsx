import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';


const Login = () => {

    const [ credentials, setCredentials ] = useState({
      username: undefined,
      password: undefined,
    });
    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id ]: e.target.value }));
    }
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({type: 'LOGIN_START'});
        try {
            const res = await axios.post('/auth/login', credentials);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            navigate('/');
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data })
        }
    }


    return (
        <div className="login">
            <div className="lContainer">
            <form>
             <input type="text" placeholder="username" id="username"
             onChange={handleChange}
             className="lInput"
             ></input>
             <input type="password" placeholder="password" id="password"
             onChange={handleChange}
             className="lInput"></input>
             <button disabled={loading} className="lButton" onClick={ handleClick }>Login</button>
             { error && <span className="error">{ error.message }</span> }
             </form>
            </div>
        </div>
    )
}

export default Login
