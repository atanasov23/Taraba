import { Navigation } from "./nav";
import { Link } from 'react-router-dom';
import { userData } from "../context/auth";
import { useContext } from 'react'

export default function Header() {

    return (

        <header>

            <Link to='/'><img className="logo" src="/image/logo.jpg" alt="logo" /></Link>
            <Link to='/adding' className="addBtn">

                <p>Добави обява</p>
            </Link>

            <Navigation />

        </header>
    )
}