import React, { useState } from 'react';
import {urlConfig} from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { post } from '../../../../giftlink-backend/routes/authRoutes';

function RegisterPage() {

    //insert code here to create useState hook variables for firstName, lastName, email, password
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');

    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    // insert code here to create handleRegister function and include console.log
    const handleRegister = async () => {
        try{
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                //Task 6: Set method
                method: POST,
                //Task 7: Set headers
                    headers: {'content-type': 'application/json'},
                //Task 8: Set body to send user details
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
            });
        } catch (e) {
            console.log("Error fetching details: " + e.message);
        }
        
        const json = await response.json();
        if (json.authtoken) {
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('name', firstName);
            sessionStorage.setItem('email', json.email);
            setIsLoggedIn(true);
            navigate('/app');
        }

        if (json.error) {
            setShowerr(json.error);
        }


    }   

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                        {/* insert code here to create input elements for all the variables - firstName, lastName, email, password */}
                        <div className="mb-4">
                            <label htmlFor="firstName" className="form label">First Name</label><br/>
                            <input id="firstName" type="text" className="form-control"
                                placeholder="Enter your first name"  value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="lastName" className="form label">Last Name</label><br/>
                            <input id="lastName" type="text" className="form-control"
                                placeholder="Enter your last Name"  value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="form label">E-mail</label><br/>
                            <input id="email" type="email" className="form-control"
                                placeholder="Enter your e-mail"  value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="pwd" className="form label">Password</label><br/>
                            <input id="pwd" type="password" className="form-control"
                                placeholder="Enter a password"  value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="text-danger">{showerr}</div>

                    {/* insert code here to create a button that performs the `handleRegister` function on click */}
                        <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>Register</button>
                    <p className="mt-4 text-center">
                        Already a member? <a href="/app/login" className="text-primary">Login</a>
                    </p>

                        </div>
                </div>
            </div>
        </div>
    ) 
    // end of return
}

export default RegisterPage;