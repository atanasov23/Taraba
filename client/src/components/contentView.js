import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { userAuth } from '../context/auth';

export function ContentView() {

    const data = useContext(userAuth);
  
   /*  const [ state, setState ] = useState(data.fetchData);

    useEffect(() => {

        setState(state => state = data.fetchData);

    }, [data.fetchData]); */

    return (

        <div className="contentView-container">

            {/*  {data.fetchData[0] === 'undefined' ? */}  {/* : ''} */}

            {/* data.fetchData?.length  > 1 ?  */data.fetchData.map((data, i) => {

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
            })/*  : '' */}

           {/*  {data.fetchData?.length  === 1 ? <Link to={`/details/${data.fetchData[0].title}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <div className='ad'>
                    <div className="container p-3 my-3 border">
                        <img src={`http://localhost:1000/${data.fetchData[0].image}`} alt=""></img>
                        <div className='textContainer'>
                            <h1>{data.fetchData[0].title}</h1>
                            <p className='location'>{data.fetchData[0].location}</p>
                            <p className='price'>{data.fetchData[0].price}лв</p>
                            <button>Добави в любими</button>
                        </div>
                    </div>
                </div>
            </Link> : ''} */}


            {data.fetchData.length === 0 ? <span >Няма обяви за показване...</span> : ''}

           {/*  {data.fetchData ?.length === 0 ? <span >Няма обяви за показване...</span> : ''} */}

        </div>
    )

}