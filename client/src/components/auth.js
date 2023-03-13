import React from 'react';
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Cookies from 'universal-cookie';

export default function Auth() {

    const location = useLocation();

    function jwt() {

        const cookies = new Cookies();

        const cookie = cookies.get('auth');

        // trqbva da vzema tokena ot cookie i da go proverq s sign na jwt sled koeto da produlji autha.

        let flag = true;

        cookie ? flag = true : flag = false;

        return flag;
    }

    return (

        jwt() ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )

}