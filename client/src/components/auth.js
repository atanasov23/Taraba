import React from 'react';
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useJwt } from "react-jwt";
import { isJwtExpired } from 'jwt-check-expiration';

export default function Auth() {

    const cookies = new Cookies();

    const token = cookies.get('auth');

    const { decodedToken } = useJwt(token);

    cookies.set('user', JSON.stringify({ decodedToken }));

    const location = useLocation();

    function jwt() {

        if (token) {

            if (isJwtExpired(token)) {

                cookies.remove('auth');

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