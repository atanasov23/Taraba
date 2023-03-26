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

            {fav?.length > 1 ? fav.map((data, i) => {

                return (
                    <Link key={i} to={`/favorite/details/${data.title}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
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
            }) : ''}

            {fav?.length === 1 ? <Link to={`/favorite/details/${fav[0].title}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <div className='ad'>
                    <div className="container p-3 my-3 border">
                        <img src={`http://localhost:1000/${fav[0].image}`} alt=""></img>
                        <div className='textContainer'>
                            <h1>{fav[0].title}</h1>
                            <p className='location'>{fav[0].location}</p>
                            <p className='price'>{fav[0].price}лв</p>

                        </div>
                    </div>
                </div>
            </Link> : ''}

            {fav == "" ? <span >Нямате любими...</span> : ''}

        </div>
    )

}