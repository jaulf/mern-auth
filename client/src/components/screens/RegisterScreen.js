import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegisterScreen = ({history}) => {
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
       if (localStorage.getItem("AuthToken")) {
           history.push("/")
       }
    }, [history]);

    const registerHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        if (password !== confirmpassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {setError("")}, 5000);
            return setError("Passwords do not match");
        }

        try {
            const { data } = await axios.post('/api/auth/register', {username, email, password}, config);

            localStorage.setItem("authToken", data.token);

            history.push("/")

        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("")
            }, 5000)
        }

    }

    return(
        <div className='register-screen'>
            <form onSubmit={registerHandler} className="register-screen__form">
                {error && <span className='error-message' >{error}</span>}
                <h3 className="register-screen__title">Register</h3>
                <div className="form-group">
                    <label htmlFor="name">Username:</label>
                    <input type='text'
                           required
                           id="name"
                           placeholder="Enter username"
                           value={username}
                           onChange={e => setUsername(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type='email'
                           required
                           id="email"
                           placeholder="Enter Email"
                           value={email}
                           onChange={e => setEmail(e.target.value)} />
                </div>

                
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type='password'
                           required
                           id="password"
                           placeholder="Enter Password"
                           value={password}
                           onChange={e => setPassword(e.target.value)} />
                </div>
                
                <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <input type='password'
                           required
                           id="confirmpassword"
                           placeholder="Confirm Password"
                           value={confirmpassword}
                           onChange={e => setConfirmPassword(e.target.value)} />
                </div>

                <button className="btn btn-primary" type="submit">Register</button>

                <span className="register_screen__subtext">Already have an account ? <Link to='/login'>Login</Link></span>
            </form>
        </div>
    )

}
 
export default RegisterScreen;