import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = localStorage.getItem("token");
    return(
        auth ? <Outlet/> : <Navigate replace to="/loginsignup"/>
    )
}

export default PrivateRoutes