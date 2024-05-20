import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/login.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ setAuth, setUserType }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            console.log(response.data.token);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userType', response.data.userType);
            localStorage.setItem('userEmail', response.data.email);

            setAuth(true);
            setUserType(response.data.userType);

            toast.success('Logged in successfully!');

           
            if (response.data.userType === 'seller') {
                setTimeout(() => {
                    history.push('/postproperties');
                }, 2000);
            } else {
                setTimeout(() => {
                    history.push('/properties');
                }, 2000);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Error logging in. Please try again.');
        }
    };
    

    return (
        <div className="container mt-5">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        placeholder="Email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        placeholder="Password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                                {error && <div className="alert alert-danger mt-3">{error}</div>}
                            </form>
                            <p className="text-center mt-3">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
