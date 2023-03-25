import { useState, useEffect, useContext, useRef } from 'react';
import { userAuth } from '../context/auth';

export function MessageView() {

    const userData = useContext(userAuth);

    const [messages, setMessages] = useState([]);

    const [getMessage, setMessage] = useState();

    const [title, setTitle] = useState();

    useEffect(() => {

        fetch(`http://localhost:1000/messages/${userData.user._id}`)
            .then(a => a.json())
            .then(a => setMessages(a))

    }, []);

    function getAnswer(e) {
        setMessage(e.target.value);
        setTitle(e.target.title);
    }

    console.log(messages);

    function deleteMessage(e) {

        fetch(`http://localhost:1000/deleteMessage`, {
            method: 'POST',
            headers: {
                'content-type': 'Application/json'
            },
            body: JSON.stringify({
                user: userData.user._id,
                message: e.target.title
            })

        });

        setMessages(data =>
            data.filter(messages => {
                // 👇️ remove object that has id equal to 2
                return messages.message !== e.target.title;
            }),
        );
    }

    function answerToMessage(e) {

        const sender = e.target.id;

        fetch(`http://localhost:1000/answerMessage`, {
            method: 'POST',
            headers: {
                'content-type': 'Application/json'
            },
            body: JSON.stringify({
                message: getMessage,
                recipient: sender,
                sender: userData.user._id,
                title,
                answer: true
            })

        });
    }


    return (

        <div className="messagesDiv">

            {messages.length === 0 ? <span>Нямате съобщения</span> : messages.map((mess, index) => {
                return (<div className="messages" key={index} >
                    <span>Обява:</span><p className='title'>{mess.title}</p>
                    <span>Съобщение:</span><p className='textMessage'>{mess.message}</p>
                    {mess.sender !== userData.user._id ? <span>Получено</span> : <span>Изпратено</span>}
                    {mess.sender !== userData.user._id ?
                        <>
                            < textarea className="answerMessageArea" placeholder="Отговор" title={mess.title} rows={4} cols={40} onBlur={getAnswer} />
                            <button className='answerBtn' onClick={answerToMessage} id={mess.sender}>Отговор</button>
                            <button className='answerBtn' onClick={deleteMessage} title={mess.message}>Изтриване</button>
                        </>
                        : <button className='answerBtn' onClick={deleteMessage} title={mess.message}>Изтриване</button>}
                </div>
                )
            })}

        </div>
    )

}