import Cookies from "js-cookie";
import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import AuthProvider from "../../context/auth";

const ProtectedRoute = ({element}:{element: JSX.Element}) => {

    const token = Cookies.get('FEUToken');
    const isAuth = token ? true : false;

    return isAuth ? <AuthProvider>
                        <Suspense fallback={<>...</>}>{element}</Suspense>
                    </AuthProvider> : 
                    <Navigate to='/login' replace />
}

export default ProtectedRoute
