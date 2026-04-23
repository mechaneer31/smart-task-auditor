


export function HandleLogout({ setToken, setUserData }) {

    setUserData(null)
    setToken(null)

    localStorage.removeItem('token')

    console.log("User logged out. Memory wiped!")
}