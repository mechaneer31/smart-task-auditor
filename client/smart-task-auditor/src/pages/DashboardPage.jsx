// Imported React Dependencies


//Imported Utilities

// Imported Pages
import { Header } from './Header'



export function DashboardPage({ setToken, setUserData }) {

    console.log('dashboard page')

    return (
        <>
            <Header
                setToken={setToken}
                setUserData={setUserData}
            />
            <h1>DASHBOARD</h1>

        </>

    )
}