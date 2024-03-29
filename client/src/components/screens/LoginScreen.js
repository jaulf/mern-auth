import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginScreen = ({history}) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
       if (localStorage.getItem("AuthToken")) {
           history.push("/")
       }
    }, [history]);

    const loginHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        try {
            const { data } = await axios.post('/api/auth/login', { email, password}, config);

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
        <div className='login-screen'>
            <form onSubmit={loginHandler} className="login-screen__form">
                {error && <span className='error-message' >{error}</span>}
                <h3 className="login-screen__title">Register</h3>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type='email'
                           required
                           id="email"
                           placeholder="Enter chinonso's Email"
                           value={email}
                           onChange={e => setEmail(e.target.value)} />
                </div>

                
                <div className="form-group">
                    <label htmlFor="password">Password: 
                    <Link to='/forgotpassword'>Forgot Password ?</Link>
                    </label>
                    <input type='password'
                           required
                           id="password"
                           placeholder="Enter Password"
                           value={password}
                           onChange={e => setPassword(e.target.value)} />
                </div>

                <button className="btn btn-primary" type="submit">Login</button>

                <span className="login_screen__subtext">Don't have an account ? <Link to='/register'>Register</Link></span>
            </form>
        </div>
    )

}
 
export default LoginScreen;