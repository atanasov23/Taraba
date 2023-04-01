import { Link } from "react-router-dom";
import { userData } from "../context/auth";
import { useContext } from "react";

export function Navigation() {

    const user_data = useContext(userData);

    return (

        <nav className="navigation">

            <div className="dropdown">
                <button className="dropbtn">Профил</button>
                <div className="dropdown-content">
                    {!user_data.token ?
                        <>
                            <Link to="/login">Влизане</Link>
                            <Link to="/register">Регистрация</Link>
                        </>
                        :
                        <>
                            <span>{user_data.user.username}</span>
                            <Link to="/user/messages">Съобщения</Link>
                            <Link to="/user/fav">Любими</Link>
                            <Link to="/user/ads">Моите обяви</Link>
                            <Link to="/logout">Излизане</Link>
                        </>
                    }
                </div>
            </div>
        </nav>

    )
}