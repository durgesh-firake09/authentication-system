import { Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"


const PrivateRoute = ({ children, ...rest }) => {
    let { user } = useContext(AuthContext)
    const ele = !user ? <Navigate to="/login" /> : children

    return ele
}

export default PrivateRoute