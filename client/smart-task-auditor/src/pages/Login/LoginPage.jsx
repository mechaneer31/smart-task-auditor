import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'





export function LoginPage({ setToken, setUserData }) {

    //Global States

    //Local States
    const [inputUsername, setInputUsername] = useState("")
    const [inputPassword, setInputPassword] = useState("")

    let navigate = useNavigate()

    const handleLogin = async () => {
        const response = await axios.post('/api/users/login', {
            username: inputUsername,
            password: inputPassword
        })

        const loggedInUser = response.data.user
        const token = response.data.token

        setUserData(loggedInUser)
        setToken(token)

        console.log("User from server: ", loggedInUser)
        console.log("Token from server: ", token)

        localStorage.setItem('token', token)

        handleClearInputs()

        navigate('/dashboard')

    }




    function handleUsernameChange(e) {
        setInputUsername(e.target.value)
    }

    function handlePasswordChange(e) {
        setInputPassword(e.target.value)
    }

    function handleClearInputs() {
        setInputUsername("")
        setInputPassword("")
    }

    return (
        <div>

            <>
                <h1>Please Log In</h1>
                <form
                    action={handleLogin}
                >

                    <label
                        className="form-login-label"
                        id="form-label-login-username"
                    >Enter your username:
                        <input
                            className="form-login-iput"
                            id="form-input-login-username"
                            onChange={handleUsernameChange}
                            placeholder="enter username"
                            required
                            type="text"
                            value={inputUsername}
                        />
                    </label>



                    <label
                        className="form-label-login"
                    >
                        Password:
                        <input
                            className="form-input-login"
                            id="form-input-login-password"
                            onChange={handlePasswordChange}
                            placeholder="enter password"
                            required
                            type="password"
                            value={inputPassword}
                        />
                    </label>



                    <button
                        className="form-button-login"
                        type="submit"
                    >
                        Log In
                    </button>

                </form>
            </>
        </div>
    )
}


