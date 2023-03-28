import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { userAuth } from '../context/auth';

export function Favorites() {

    const [fav, setFav] = useState([]);

    const data = useContext(userAuth);

    useEffect(() => {

        fetch(`http://localhost:1000/fav/${data.user._id}`)
            .then(a => a.json())
            .then(a => setFav(a));
    }, [])

    return (

        <div className="contentView-container">

            {fav.map((data, i) => {

                return (
                    <Link key={i} to={`/favorite/details/${data._id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
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

            {fav.length === 0 ? <span >Нямате любими...</span> : ''}

        </div>
    )

}