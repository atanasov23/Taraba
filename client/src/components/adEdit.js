import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { addingInputValidation, addingEmptyFieldValidation } from '../utils/inputValidation';
import { userData } from "../context/auth";
import { adsData } from "../context/adsData";
import { showMessage } from "../utils/showMessage";
import { editData, editMyAds, editPic } from "../services/dataService";

export function Edit() {

    const navigate = useNavigate();

    const params = useParams()

    const user_data = useContext(userData);

    const ads_data = useContext(adsData);

    const [error, setError] = useState();

    const [uploadFile, setFile] = useState("");

    const [oldData, setOldData] = useState("");

    useEffect(() => {

        ads_data.allAds.filter(data => {

            if (data._id === params.id) {
                setOldData(data);
            }

            return data;
        })

    }, [ads_data.allAds, params.id]);


    const sendData = (e) => {

        e.preventDefault();

        const checkData = addingEmptyFieldValidation(oldData);

        setError(checkData.err);

        if (checkData.send && error === undefined) {

            const data = new FormData();

            data.append("file", uploadFile[0]);

            if (data.get('file') !== "undefined") {

                editPic(data);
            }

            editData(oldData);

            editMyAds(oldData, user_data.user._id);

            updateState();
        }

        showMessage('Обявата е редактирана');
    }

    const updateState = () => {

        const all = ads_data.allAds.map(obj => {

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

        const myAds = ads_data.myAds.map(obj => {

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

        const lastAds = ads_data.lastAds.map(obj => {

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

        ads_data.setAllAds(all);

        ads_data.setMyAds(myAds);

        ads_data.setLastAds(lastAds);

        setTimeout(() => {

            navigate(`/details/${params.id}`);

        }, 4000);

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
            <span>Редактиране</span>
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
                        <option value='electronic'>Електроника</option>
                        <option value='tools'>Инструменти</option>
                        <option value='animals'>Животни</option>
                        <option value='service'>Услуги</option>
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
                        value={oldData.phone || ''}
                    />
                </div>

                <div className="showMessage">
                    <p></p>
                </div>
                <button id='adding'>Редакция</button>
            </form>
        </div>

    )
}