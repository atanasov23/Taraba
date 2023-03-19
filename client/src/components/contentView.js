import { useState, useEffect } from 'react';

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
                    /*  <div className="ad" key={data._id}>
                         <img src='http://localhost:1000/Mountain-Nature-Wallpaper-1920x1200-56833.jpg'></img>
                     </div> */
                    <div key={data._id} className='ad'>
                        <div className="container p-3 my-3 border">
                            <img src='http://localhost:1000/Mountain-Nature-Wallpaper-1920x1200-56833.jpg'></img>
                            <div className='textContainer'>
                            <h1>{data.title}</h1>
                            <p className='location'>{data.location}</p>
                            <p className='price'>{data.price}лв</p>
                            <button>Добави в любими</button>
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )

}