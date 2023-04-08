import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { userData } from "../context/auth";
import { adsData } from "../context/adsData";
import { showMessage } from "../utils/showMessage";
import { saveMessage } from "../utils/sendMessage";

export function AdDetails() {

    const user_data = useContext(userData);

    const ads_Data = useContext(adsData);

    const params = useParams();

    const [ad, setAd] = useState([]);

    const textMessage = useRef();

    const navigate = useNavigate();

    useEffect(() => {

        ads_Data.allAds.filter(data => {

            if (data._id === params.id) {

                setAd(data);
            };

            return data;
        })

    }, [ads_Data.allAds, params.id]);

    function sendMessage() {

        showMessage('Съобщението е изпратено');

        saveMessage({
            message: textMessage.current.value,
            recipient: ad.owner,
            sender: user_data.user._id,
            title: ad.title
        });
    }

    function adDelete() {

        ads_Data.setAllAds(ads => {

            return ads.filter(ads => {

                return ads._id !== params.id;
            })

        });

        ads_Data.setMyAds(ads => {

            return ads.filter(ads => {

                return ads._id !== params.id;
            })

        });

        ads_Data.setLastAds(ads => {

            return ads.filter(ads => {

                return ads._id !== params.id;
            })

        });

        showMessage('Обявата е изтрита');

        setTimeout(() => {

            navigate('/');

        }, 2000);


        fetch(`http://localhost:1000/adDelete/${params.id}`);

        fetch(`http://localhost:1000/delete/myAd/${params.id}/${user_data.user._id}`);

    }

    function addToFav() {

        showMessage('Добавено в любими');

        fetch(`http://localhost:1000/addFav/${params.id}/${user_data.user._id}`);

        ads_Data.setMyFavorites(fav => [...fav, ad]);

    }

    return (

        <>
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

                    {ad.owner !== user_data.user._id ?

                        <>
                            {user_data.user._id !== undefined && ad.owner !== user_data.user._id ?
                                <>
                                    <button onClick={addToFav}>Добави в любими</button>
                                </>
                                : ''}
                        </>
                        : <>
                            <Link to={`/ad/edit/${ad._id}`}><button>Редакция</button></Link>
                            <button onClick={adDelete}>Изтриване</button>

                        </>}

                </div>

            </div>

        </>
    )

}