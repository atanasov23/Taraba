import { useContext } from "react";
import { userAuth } from "../context/auth";
import { Navigate } from "react-router-dom";

export function Logout() {

    const data = useContext(userAuth);;

    data.setToken("");

    return (
        <div><Navigate to='/'></Navigate></div>
    )

}