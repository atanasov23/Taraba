import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { userAuth } from "../context/auth";


export function AdDetails() {

    const userData = useContext(userAuth);

    const params = useParams();

    const [data, setData] = useState([]);

    const mainPicRef = useRef();

    useEffect(() => {

        fetch(`http://localhost:1000/details/${params.id}`)
            .then(a => a.json())
            .then(a => {
                setData((data) => [...data, a, a.pictures]);
            });

    }, [])

    const changeImage = (e) => mainPicRef.current.src = e.target.src;

    return (

        <div className="adDetails">

            <img className="mainPic" src={`http://localhost:1000/${data[1] !== undefined ? data[1][0] : ''}`} ref={mainPicRef} alt="" />

            <div className="imageGalery">
                {data[1] !== undefined ? data[1].map((a, b) => {
                    return <img key={b} src={`http://localhost:1000/${a}`} alt="" onClick={changeImage} />
                }) : ''}
            </div>
            <div className="adData">
                <h1>{data[0] !== undefined ? data[0].title : ''}</h1>
                <p className="price-2">{data[0] !== undefined ? data[0].price : ''}лв</p>
                <p className="description">{data[0] !== undefined ? data[0].description : ''}</p>
            </div>

            <div className="buttons">

                {data[0] !== undefined && data[0].owner !== userData.user._id ?

                    <>
                        {userData.user._id !== undefined ?
                            <>
                                <button>Добави в любими</button>
                                <button>Съобщение</button>
                            </>
                            : ''}
                    </>
                    : <>
                        <Link to={`/ad/edit/${data[0] !== undefined ? data[0]._id : ''}`}><button>Редакция</button></Link>
                        <button>Изтриване</button>

                    </>}

            </div>

        </div>
    )

}