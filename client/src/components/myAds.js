import { useState, useEffect, useContext } from "react"
import { userData } from "../context/auth";
import { Link } from "react-router-dom";

export function MyAds() {

    const [myAds, setMyAds] = useState([]);

    const user_data = useContext(userData);

    useEffect(() => {

        fetch(`http://localhost:1000/myAds/${user_data.user._id}`)
            .then(a => a.json())
            .then(a => setMyAds(a));

    }, []);

    return (

        <div className="contentView-container">

            <h3>Моите обяви</h3>

            {myAds.map((data, i) => {

                return (
                    <Link key={i} to={`/details/${data._id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <div className='ad'>
                            <div className="container p-3 my-3 border">
                                <img src={`http://localhost:1000/${data.image}`} alt=""></img>
                                <div className='textContainer'>
                                    <h1>{data.title}</h1>
                                    <p className='location'>{data.location}</p>
                                    <p className='price'>{data.price}лв</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}

            {myAds.length === 0 ? <span >Нямате обяви...</span> : ''}

        </div>
    )


}