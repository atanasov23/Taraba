import { Navigation } from "./nav";
import { Link } from 'react-router-dom';
import { userAuth } from "../context/auth";
import { useContext } from 'react'

export default function Header() {

    const userData = useContext(userAuth);

    return (

        <header>

            <Link to='/'><img className="logo" src="/image/logo.jpg" alt="logo" /></Link>
            <span>Потребител: {userData.user.username}</span>
            <Link to='/adding' className="addBtn">

                <p>Добави обява</p>
            </Link>

            <Navigation /* auth={props.auth} */ />

        </header>
    )
}