import React from 'react';
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { isJwtExpired } from 'jwt-check-expiration';
import { useContext } from 'react';
import { userData } from '../context/auth';

export default function Auth() {

    const user_data = useContext(userData);

    const location = useLocation();

    function jwt() {

        if (user_data.token !== '') {

            if (isJwtExpired(user_data.token)) {

                user_data.setToken("");

            }

        } else {

            return true;
        }
    }

    return (

        !jwt() ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )

}