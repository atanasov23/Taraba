import { useState, useContext, useEffect } from "react";
import { AddingPicture } from "./addingPicture";
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { addingInputValidation, addingEmptyFieldValidation } from '../utils/inputValidation';
import { userAuth } from "../context/auth";


export function Edit() {

    const navigate = useNavigate();

    const params = useParams()

    const userData = useContext(userAuth);

    const [error, setError] = useState();

    const [uploadFile, setFile] = useState("");

    const [oldData, setOldData] = useState("");

    useEffect(() => {

        userData.fetchData.filter(data => {

            if (data._id === params.id) {
                setOldData(data);
            }
        })

    }, []);


    const sendData = (e) => {

        e.preventDefault();

        const checkData = addingEmptyFieldValidation(oldData);

        setError(checkData.err);

        if (checkData.send && error === undefined) {

            const data = new FormData();

            data.append("file", uploadFile[0]);

            if (data.get('file') !== "undefined") {

                fetch('http://localhost:1000/edit/pic', {
                    method: "POST",
                    body: data,
                });
            }

            fetch('http://localhost:1000/edit/data', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(oldData),
            });

            updateState();
        }
    }

    const updateState = () => {

        const newState = userData.fetchData.map(obj => {

            if (obj._id === params.id) {

                return {
                    ...obj,
                    title: oldData.title,
                    category: oldData.category,
                    description: oldData.description,
                    location: oldData.location,
                    phone: oldData.phone,
                    price: oldData.price,
                    image: oldData.image
                };
            }

            return obj;
        });

        userData.setData(newState);

        setTimeout(() => {

            navigate(`/details/${params.id}`);
        }, 1000)

        

    };


    const getInputValue = (e) => {

        const name = e.target.name;

        const value = e.target.value;

        setOldData(({ ...oldData, [name]: value }));

        if (value.startsWith("C")) {

            setOldData(data => ({ ...data, [name]: value.replace('C:', "").replace('\\fakepath\\', '') }));

        } else {

            setOldData(data => ({ ...data, [name]: value }));
        }
    }

    const dataValidation = (e) => {

        setError(addingInputValidation(e.target));

    }

    const onChange = (e) => {
        upload(e);
        getInputValue(e);
    }

    const upload = (e) => {

        setFile(fileArr => [...fileArr, e.target.files[0]]);

        const fileReader = new FileReader();

        fileReader.readAsDataURL(e.target.files[0]);

        fileReader.addEventListener('load', () => {

            document.getElementsByName(e.target.id)[0].src = fileReader.result;

            e.target.disabled = true;

        });
    }

    return (

        <div className="addingContainer">
            <span>Добави обява</span>
            <div id='error'>{error}</div>
            <form onSubmit={sendData} method="POST">
                <div className="form-group">
                    <label htmlFor="title">Заглавие *</label>
                    <input className="form-input"
                        type="text"
                        onChange={getInputValue}
                        onBlur={dataValidation}
                        name="title"
                        value={oldData.title || ''}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Категория *</label>
                    <select onChange={getInputValue} name="category" value={oldData.category}>
                        <option value='electronics'>Електроника</option>
                        <option value='tools'>Инструменти</option>
                        <option value='animals'>Животни</option>
                        <option value='services'>Услуги</option>
                        <option value='cars'>Коли</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="">Описание *</label>
                    <textarea
                        className="text-input"
                        type="text"
                        onChange={getInputValue}
                        onBlur={dataValidation}
                        name="description"
                        value={oldData.description || ''}

                    />
                </div>

                <div className="image-upload">

                    <div className='option' >
                        <img alt="" className="del-image" src='image/delete-icon.png' />
                    </div>
                    <label htmlFor="image" className='image'>
                        <img alt="" className="file-input" name="image" src={`http://localhost:1000/${oldData.image}`} />
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={onChange}
                        name="image"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="">Локация *</label>
                    <input
                        className="form-input"
                        type="text"
                        onChange={getInputValue}
                        onBlur={dataValidation}
                        name="location"
                        value={oldData.location || ''}

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Цена *</label>
                    <input
                        className="form-input"
                        type="text"
                        onChange={getInputValue}
                        onBlur={dataValidation}
                        name="price"
                        value={oldData.price || ''}

                    />
                </div>
                <div className="form-group">

                    <label htmlFor="email">Имейл</label>
                    <input
                        className="form-input"
                        type='text'
                        id='email'
                        name='email'
                        onChange={getInputValue}
                        value={userData.user.email}
                        readOnly

                    />
                    <br></br>
                    <label htmlFor="phone">Телефонен номер</label>
                    <input
                        className="form-input"
                        type='text'
                        id='phone'
                        name='phone'
                        onChange={getInputValue}
                        value={oldData.phone || ''}
                    />
                </div>
                <button id='adding'>Редакция</button>
            </form>
        </div>

    )
}