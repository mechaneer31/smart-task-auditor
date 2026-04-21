// Imported React Dependencies
import { useNavigate } from "react-router"




export function Header({ setToken, setUserData }) {

    let navigate = useNavigate()


    function handleLogout() {
        console.log('Value of prop: ', setUserData)
        setUserData([])
        setToken(null)

        localStorage.removeItem('token')

        console.log("User logged out. Memory wiped!")

        navigate('/login')
    }


    return (
        <>
            <nav>
                <button
                    type="button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </nav>
        </>
    )
}