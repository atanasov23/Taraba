import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { addingInputValidation, addingEmptyFieldValidation } from '../utils/inputValidation';
import { userData } from "../context/auth";
import { adsData } from "../context/adsData";

export default function Adding() {

    const navigate = useNavigate();

    const user_data = useContext(userData);

    const ads_Data = useContext(adsData);

    const [error, setError] = useState();

    const [input, setInput] = useState({});

    const [uploadFile, setFile] = useState("");

    const sendData = async (e) => {

        e.preventDefault();

        const checkData = addingEmptyFieldValidation(input);

        setError(checkData.err);

        let adId = {};

        if (checkData.send && error === undefined) {

            const data = new FormData();

            data.append("file", uploadFile[0]);


            if (data.get('file') !== 'undefined') {

                fetch('http://localhost:1000/adding/image', {
                    method: "POST",
                    body: data,
                });
            }

            adId = fetch('http://localhost:1000/adding/data', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input),
            });

        }

        await adId.then(a => a.json()).then(a => input._id = a._id);


        fetch('http://localhost:1000/my/ads', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input),
        });

        ads_Data.setAllAds(data => [...data, input])

        navigate('/');

    }

    const getInputValue = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setInput(values => ({ ...values, ['owner']: user_data.user._id }));

        if (value.startsWith("C")) {

            setInput(values => ({ ...values, [name]: value.replace('C:', "").replace('\\fakepath\\', '') }));

        } else {

            setInput(values => ({ ...values, [name]: value }));
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
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="title">Заглавие *</label>
                    <input className="form-input"
                        type="text"
                        onChange={getInputValue}
                        onBlur={dataValidation}
                        name="title"
                        value={input.name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Категория *</label>
                    <select onChange={getInputValue} name="category" value={input.name}>
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
                        value={input.name}
                    />
                </div>

                {/*  <AddingPicture input={input} onChange={onChange} /> */}

                <div className="image-upload">

                    <div className='option' >
                        <img alt="" className="del-image" src='image/delete-icon.png' />
                    </div>
                    <label htmlFor="image" className='image'>
                        <img alt="" className="file-input" name="image" src="/image/download-image.png" />
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={onChange}
                        name="image"
                        value={input.name || ''}
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
                        value={input.name}
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
                        value={input.name}
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
                        value={user_data.user.email}
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
                        value={input.name}
                    />
                </div>
                <button id='adding'>Добави обява</button>
            </form>
        </div>

    )
}