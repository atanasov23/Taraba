import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";


export function DisplayAds() {

    const params = useParams();

    const [ads, setAds] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:1000/ads/${params.electronic}`)
            .then(a => a.json())
            .then(a => {
                setAds(a);
            });
    });


    return (
        <div className="contentView-container">

            {ads.map((data, i) => {

                return (
                    <Link key={i} to={`/details/${data._id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <div className='ad'>
                            <div className="container p-3 my-3 border">
                                <img src={`http://localhost:1000/${data.image}`} alt=""></img>
                                <div className='textContainer'>
                                    <h1>{data.title}</h1>
                                    <p className='location'>{data.location}</p>
                                    <p className='price'>{data.price}лв</p>
                                    <button>Добави в любими</button>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}

            {ads.length === 0 ? <span >Няма обяви за показване...</span> : ''}

        </div>
    )


}