import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function ContentView() {

    const [fetchData, setFetchData] = useState([]);

    useEffect(() => {

        fetch('http://localhost:1000')
            .then(a => a.json())
            .then(a => {
                setFetchData((fetchData) => fetchData = a);
            });
    }, []);

    return (

        <div className="contentView-container">

            {fetchData.map(data => {

                return (
                    <Link key={data._id} to={`/ad/details/${data._id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <div className='ad'>
                            <div className="container p-3 my-3 border">
                                <img src={`http://localhost:1000/${data.pictures[0]}`}></img>
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