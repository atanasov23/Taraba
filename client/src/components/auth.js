import React from 'react';
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { isJwtExpired } from 'jwt-check-expiration';

export default function Auth() {

    const [cookies, removeCookie] = useCookies();

    const location = useLocation();
    
    function jwt() {

        if (cookies.auth) {

            if (isJwtExpired(cookies.auth)) {

                removeCookie('auth');
                
                removeCookie('user');

                return true;

            }

        } else {

            return true;
        }
    }

    return (

        !jwt() ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )

}