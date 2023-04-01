import { useContext } from "react";
import { userData } from "../context/auth";
import { Navigate } from "react-router-dom";

export function Logout() {

    const user_data = useContext(userData);;

    user_data.setToken("");

    user_data.setUser("");

    return (
        <div><Navigate to='/'></Navigate></div>
    )

}