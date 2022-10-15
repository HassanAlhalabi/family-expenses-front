import Cookies from "js-cookie";
import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import AuthProvider from "../../context/auth";
import { isAdmin } from "../../heplers";

const AuthorizedRoute = ({element}:{element: JSX.Element}) => {

    const token = Cookies.get('FEUToken');
    const isAuth = token ? true : false;

    return (isAuth && isAdmin()) ? <AuthProvider>
                                        <Suspense fallback={<>...</>}>{element}</Suspense>
                                    </AuthProvider> : 
                                    <Navigate to='/' replace />
}

export default AuthorizedRoute;

