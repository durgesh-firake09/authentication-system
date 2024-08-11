import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect, Children } from "react";
import { json, useFetcher, useNavigate } from "react-router-dom";


const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    )
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null
    )
    // console.log(localStorage.getItem("aut"))
    const [loading, setLoading] = useState(true);

    const history = useNavigate()

    const loginUser = async (email, password) => {
        const response = await fetch("http://localhost:8000/api/v1/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()
        console.log(data)
        if (response.status === 200) {
            console.log("Logged in")
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            history('/')
        }
        else {
            console.log(response.status)
            console.log("Error in login")
            alert("Something went wrong " + response.status)
        }
    }
    const registerUser = async (email, username, password, password2) => {
        const response = await fetch("http://localhost:8000/api/v1/register/", {
            method: "POST",
            headers: {  
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ email, username, password, password2 })
        })
        if (response.status === 201) {
            history('/login')
        } else {
            console.log(response.status)
            console.log("Error in login")
            alert("Something went wrong " + response.status)
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        history("/login")
    }

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? "Loading" : children}
        </AuthContext.Provider>
    )
}