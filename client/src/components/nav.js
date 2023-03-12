import { Link } from "react-router-dom"

export function Navigation() {

    return (

        <nav className="navigation">
            <Link to="/user/messages">Съобщения</Link>
            <Link to="/user/fav">Любими</Link>
            <Link to="/user/profile">
                <div class="dropdown">
                    <button class="dropbtn">Профил</button>
                    <div class="dropdown-content">
                        <Link to="#">Link 1</Link>
                        <Link to="#">Link 2</Link>
                        <Link to="#">Link 3</Link>
                    </div>
                </div>
            </Link>
        </nav>

    )
}