import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { userData } from "../context/auth";
import { adsData } from "../context/adsData";

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
                recipient: ad.owner,
                sender: user_data.user._id,
                title: ad.title
            })

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

        fetch(`http://localhost:1000/adDelete/${params.id}`);

        fetch(`http://localhost:1000/delete/myAd/${params.id}/${user_data.user._id}`);

        const messageDiv = document.getElementsByClassName('showMessage')[0];

        messageDiv.style.display = 'block';

        messageDiv.textContent = 'Обявата е изтрита';

        setTimeout(() => {

            messageDiv.style.display = 'none';

            navigate('/');

        }, 2000);
        
    }

    function addToFav() {

        const messageDiv = document.getElementsByClassName('showMessage')[0];

        messageDiv.style.display = 'block';

        messageDiv.textContent = 'Добавено в любими';

        setTimeout(() => {

            messageDiv.style.display = 'none';

        }, 3000);

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

                <img className="mainPic" src={ad.image == 'undefined' ? '' : `http://localhost:1000/${ad.image}`} alt="" />

                <div className="imageGalery">

                </div>

                <div className="showMessage">
                    <p></p>
                </div>

                <div className="adData">
                    <h1>{ad !== undefined ? ad.title : ''}</h1>
                    <p className="price-2">{ad !== undefined ? ad.price : ''}лв</p>
                    <p className="description">{ad !== undefined ? ad.description : ''}</p>
                </div>

                <div className="buttons">

                    {ad !== undefined && ad.owner !== user_data.user._id ?

                        <>
                            {user_data.user._id !== undefined && ad.owner !== user_data.user._id ?
                                <>
                                    <button onClick={addToFav}>Добави в любими</button>
                                </>
                                : ''}
                        </>
                        : <>
                            <Link to={`/ad/edit/${ad !== undefined ? ad._id : ''}`}><button>Редакция</button></Link>
                            <button onClick={adDelete}>Изтриване</button>

                        </>}

                </div>

            </div>

        </>
    )

}