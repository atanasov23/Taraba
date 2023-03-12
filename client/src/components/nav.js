import { Link } from "react-router-dom"

export function Navigation() {

    return (

        <nav className="navigation">
            <Link to="/user/messages">Съобщения</Link>
            <Link to="/user/fav">Любими</Link>
            <Link to="/user/profile">Профил</Link>
        </nav>

    )
}