import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { userAuth } from "../context/auth";

export function AdDetails() {

    const userData = useContext(userAuth);

    const params = useParams();

    const [data, setData] = useState([]);

    const mainPicRef = useRef();

    const textMessage = useRef();

    useEffect(() => {

        fetch(`http://localhost:1000/details/${params.id}`)
            .then(a => a.json())
            .then(a => {
                setData(data => data = a);
            });

    }, [])

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

    const changeImage = (e) => mainPicRef.current.src = e.target.src;

    return (

        <>
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

                <img className="mainPic" src={`http://localhost:1000/${data.image}`} ref={mainPicRef} alt="" />

                <div className="imageGalery">
                  {/*   {data[1] !== undefined ? data[1].map((a, b) => {
                        return <img key={b} src={`http://localhost:1000/${a}`} alt="" onClick={changeImage} />
                    }) : ''} */}
                </div>
                <div className="adData">
                    <h1>{data!== undefined ? data.title : ''}</h1>
                    <p className="price-2">{data !== undefined ? data.price : ''}лв</p>
                    <p className="description">{data !== undefined ? data.description : ''}</p>
                </div>

                <div className="buttons">

                    {data !== undefined && data.owner !== userData.user._id ?

                        <>
                            {userData.user._id !== undefined ?
                                <>
                                    <button>Добави в любими</button>
                                </>
                                : ''}
                        </>
                        : <>
                            <Link to={`/ad/edit/${data !== undefined ? data._id : ''}`}><button>Редакция</button></Link>
                            <button>Изтриване</button>

                        </>}

                </div>

            </div>

        </>
    )

}