import { useContext, useEffect } from "react";
import { userData } from "../context/auth";
import { useNavigate } from "react-router-dom";

export function Logout() {

    const user_data = useContext(userData);

    const navigate = useNavigate();

    user_data.setToken("");

    user_data.setUser("");

    useEffect(() => navigate('/'));

}