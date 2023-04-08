import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { userData } from "../context/auth";
import { adsData } from "../context/adsData";
import { showMessage } from "../utils/showMessage";
import { saveMessage } from "../utils/sendMessage";

export function FavoritesDetails() {

    const user_data = useContext(userData);

    const ads_data = useContext(adsData);

    const params = useParams();

    const [ad, setAd] = useState([]);

    const textMessage = useRef();

    const navigate = useNavigate();

    useEffect(() => {

        ads_data.allAds.filter(data => {

            if (data._id === params.id) {
                setAd(data);
            }

            return data;
        })

    }, [ads_data.allAds, params.id]);

    function sendMessage() {

        showMessage('Съобщението е изпратено');

        saveMessage({
            message: textMessage.current.value,
            recipient: ad.owner,
            sender: user_data.user._id,
            title: ad.title
        });

    }

    function removeFromFav() {

        fetch(`http://localhost:1000/removeFav/${ad._id}/${user_data.user._id}`);

        showMessage('Премахнато от любими');

        ads_data.setMyFavorites(ads => {

            return ads.filter(myFav => {

                return myFav._id !== params.id;
            })

        });

        setTimeout(() => {

            navigate('/user/fav');

        }, 4000);
    }

    return (

        <>

            {ad.length === 0 ? 'Нямате любими' : ''}
            {ad.owner !== user_data.user._id ?

                <>
                    {user_data.user._id !== undefined ?
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

                <img className="mainPic" src={`http://localhost:1000/${ad.image}`} alt="" />

                <div className="imageGalery">

                </div>
                <div className="showMessage">
                    <p></p>
                </div>

                <div className="adData">
                    <h1>{ad.title}</h1>
                    <p className="price-2">{ad.price}лв</p>
                    <p className="description">{ad.description}</p>
                </div>

                <div className="buttons">

                    <button onClick={removeFromFav}>Премахване от любими</button>

                </div>

            </div>

        </>
    )

}