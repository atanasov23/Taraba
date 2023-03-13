import { Link } from "react-router-dom"

export function Navigation() {

    return (

        <nav className="navigation">
            <Link to="/user/messages">Съобщения</Link>
            <Link to="/user/fav">Любими</Link>
            <div className="dropdown">
                <button className="dropbtn">Профил</button>
                <div className="dropdown-content">
                    <Link to="#">Link 1</Link>
                    <Link to="#">Link 2</Link>
                    <Link to="#">Link 3</Link>
                </div>
            </div>
        </nav>

    )
}