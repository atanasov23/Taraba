import { Link } from "react-router-dom"

export function AdContainer(props) {

    return (
        <Link to={`/details/${props.data._id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <div className='ad'>
                <div className="container p-3 my-3 border">
                    <img src={`http://localhost:1000/${props.data.image}`} alt=""></img>
                    <div className='textContainer'>
                        <h1>{props.data.title}</h1>
                        <p className='location'>{props.data.location}</p>
                        <p className='price'>{props.data.price}лв</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}