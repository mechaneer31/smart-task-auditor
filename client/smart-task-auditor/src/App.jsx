// Imported React Dependencies
import { Routes, Route } from 'react-router'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

// Imported Utilities
import { jwtDecode } from 'jwt-decode'


//Imported Pages
import { LoginPage } from '../src/pages/Login/LoginPage'
import { DashboardPage } from '../src/pages/DashboardPage'



function App() {

    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState([])

    let navigate = useNavigate()

    useEffect(() => {


        const currentToken = localStorage.getItem('token')
        console.log("current token: ", currentToken)

        if (currentToken) {
            const decoded = jwtDecode(currentToken)
            const currentTime = Date.now() / 1000

            if (decoded.exp < currentTime) {
                localStorage.removeItem('token')
            }
        }

        const tokenStatus = localStorage.getItem('token')

        if (tokenStatus) {
            navigate('/dashboard')
        } else {
            navigate('/login')
        }
    }, [navigate])


    return (
        <>
            <Routes>

                <Route
                    path="login"
                    element={<LoginPage
                        setToken={setToken}
                        token={token}
                        setUserData={setUserData}
                    />}
                />

                <Route
                    path="dashboard"
                    element={<DashboardPage
                        setToken={setToken}
                        setUserData={setUserData}
                    />}
                />

            </Routes>

        </>
    )


}

export default App