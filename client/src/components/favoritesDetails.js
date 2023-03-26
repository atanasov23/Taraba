import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { userAuth } from "../context/auth";

export function FavoritesDetails() {

    const userData = useContext(userAuth);

    const params = useParams();

    const [data, setGetData] = useState([]);

    const textMessage = useRef();

    const navigate = useNavigate();

    useEffect(() => {

        const ad = userData.fetchData.filter(data => {

            if (data.title === params.id) {
                setGetData(data);
            }
        })

    }, []);

    function sendMessage() {

        fetch(`http://localhost:1000/sendMessage/`, {
            method: 'POST',
            headers: {
                'content-type': 'Application/json'
            },
            body: JSON.stringify({
                message: textMessage.current.value,
                recipient: data.owner,
                sender: userData.user._id,
                title: data.title
            })

        });

    }

    function adDelete() {

        fetch(`http://localhost:1000/adDelete/${params.id}`);

        userData.setData(ads => {

            return ads.filter(ads => {

                return ads.title !== params.id;
            })

        });

       
    }

    function removeFromFav() {

        fetch(`http://localhost:1000/removeFav/${data._id}/${userData.user._id}`);

       
    }


    return (

        <>
           {data.length === 0 ? 'Нямате любими' : 'aad'}
            {data !== undefined && data.owner !== userData.user._id ?

                <>
                    {userData.user._id !== undefined ?
                        <>
                            <div className="messageContainer">
                                <textarea className="messageArea" placeholder="Изпрати съобщение" name="postContent" rows={4} cols={40} ref={textMessage} />
                                <button className="sendMessageBtn" onClick={sendMessage}>Съобщение</button>
                            </div>
                        </>
                        : ''}
                </>
                : ""}

            <div className="adDetails">

                <img className="mainPic" src={data.image == 'undefined' ? '' : `http://localhost:1000/${data.image}`} alt="" />

                <div className="imageGalery">

                </div>
                <div className="adData">
                    <h1>{data !== undefined ? data.title : ''}</h1>
                    <p className="price-2">{data !== undefined ? data.price : ''}лв</p>
                    <p className="description">{data !== undefined ? data.description : ''}</p>
                </div>

                <div className="buttons">

                    <button onClick={removeFromFav}>Премахване от любими</button>

                </div>

            </div>

        </>
    )

}