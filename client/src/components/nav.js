import { Link } from "react-router-dom";
import { userAuth } from "../context/auth";
import { useContext } from "react";

export function Navigation() {

    const userData = useContext(userAuth);

    return (

        <nav className="navigation">

            <div className="dropdown">
                <button className="dropbtn">Профил</button>
                <div className="dropdown-content">
                    {!userData.token ?
                        <>
                            <Link to="/login">Влизане</Link>
                            <Link to="/register">Регистрация</Link>
                        </>
                        :
                        <>
                            <Link to="/user/messages">Съобщения</Link>
                            <Link to="/user/fav">Любими</Link>
                            <Link to="#">Излизане</Link>
                        </>
                    }
                </div>
            </div>
        </nav>

    )
}