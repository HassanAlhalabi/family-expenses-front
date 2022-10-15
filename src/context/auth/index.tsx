import Cookies from 'js-cookie';
import { createContext, ReactNode, useState, useEffect } from 'react';
import { isAdmin } from '../../heplers';
import { initHTTPToken } from '../../http';

export const AuthContext = createContext({
    isAuth: false,
    isAdmin: false,
});

export const AuthProvider = ({children}:{children: ReactNode}) => {

    const [isAuthUser, setIsAuth] = useState(false);
    const [isAdminUser, setIsAdmin] = useState(false);
    const token = Cookies.get('FEUToken');

    initHTTPToken();

    useEffect(() => {
        if(token) {
            setIsAuth(true);
            if(isAdmin()) {
                setIsAdmin(true);
            }
        }
    },[token]);

    return  <AuthContext.Provider value={{isAuth: isAuthUser,isAdmin: isAdminUser}}>
                {children}
            </AuthContext.Provider>
}

export default AuthProvider;
