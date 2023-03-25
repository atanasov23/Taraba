import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function ContentView() {

    const [fetchData, setFetchData] = useState([]);

    useEffect(() => {

        fetch('http://localhost:1000/all')
            .then(a => a.json())
            .then(a => {
                setFetchData((fetchData) => fetchData = a);
            });
    }, []);

    return (

        <div className="contentView-container">

           {/*  {fetchData.length === 0 ? <span >Няма обяви за показване...</span> : ''} */}

            {fetchData.map(data => {

                return (
                    <Link key={data._id} to={`/details/${data._id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
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

        </div>
    )

}