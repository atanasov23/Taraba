import { useState, useEffect, useContext } from "react"
import { userAuth } from "../context/auth";
import { Link } from "react-router-dom";

export function MyAds() {

    const [ data, setData ] = useState([]);

    const user = useContext(userAuth);

    useEffect(() => {

        fetch(`http://localhost:1000/myAds/${user.user._id}`)
        .then(a => a.json())
        .then(a => setData(a));
    }, [])

    return (

        <div className="contentView-container">

            {/*  {data.fetchData[0] === 'undefined' ? */}  {/* : ''} */}

            {data?.length  > 1 ? data.map((data, i) => {

                return (
                    <Link key={i} to={`/details/${data.title}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
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
            }) : ''}

            {data?.length  === 1 ? <Link to={`/details/${data.title}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
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
            </Link> : ''}


            {data == "" ? <span >Нямате обяви...</span> : ''}

           {/*  {data.fetchData ?.length === 0 ? <span >Няма обяви за показване...</span> : ''} */}

        </div>
    )


}