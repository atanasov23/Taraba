import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { adsData } from '../context/adsData';
import { userData } from '../context/auth';

export function Favorites() {

/*     const user_data = useContext(userData); */

    const ads_data = useContext(adsData);

/*     useEffect(() => {

        fetch(`http://localhost:1000/fav/${user_data.user._id}`)
            .then(a => a.json())
            .then(a => ads_data.setMyFavorites(a));

    }, []); */

    return (

        <div className="contentView-container">

            <h3>Любими</h3>

            {ads_data.myFavorites.map((data, i) => {

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

            {ads_data.myFavorites.length === 0 ? <span >Нямате любими...</span> : ''}

        </div>
    )

}