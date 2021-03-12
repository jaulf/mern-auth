import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrivateScreen = ( {history} ) => {

    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        if (!localStorage.getItem('AuthToken')) {
            history.push("/login");
        }

        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("Auth-Token")}`
                }
            }

            try {
                const {data} = await axios.get('/api/auth/private', config);
                setPrivateData(data.data)
            } catch (error) {
                setError("You are not authorized please login");
                localStorage.removeItem("AuthToken");
            }

        }
        fetchPrivateData();
    }, [history])

    const logoutHandler = () => {
        localStorage.removeItem("AuthToken");
        history.push('/login')
    }

    return error ? (
        <span className='error-message'>{error}</span>
    ) : (
        <>
            <div style={{background:"green", color: "white"}}>{privateData}</div>
            <button onClick={logoutHandler}>Logout</button>
        </>
    )
}
 
export default PrivateScreen;