import React from 'react';
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { isJwtExpired } from 'jwt-check-expiration';
import { useContext } from 'react';
import { userAuth } from '../context/auth';

export default function Auth() {

    const userData = useContext(userAuth);

    const location = useLocation();

    function jwt() {

        if (userData.token !== '') {

            if (isJwtExpired(userData.token)) {

                userData.setToken("");

            }

        } else {

            return true;
        }
    }

    return (

        !jwt() ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )

}