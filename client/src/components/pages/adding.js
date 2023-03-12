import { useRef, useState } from "react";

export default function Adding() {

    const image = useRef();

    const file = useRef();

    const [input, setInput] = useState({});

    const [uploadFile, setFile] = useState("");

    const sendData = async (e) => {

        e.preventDefault();

        /*    fetch('http://localhost:1000/adding', {
   
               method: 'POST',
               headers: {
                   "Content-Type": "application/json",
               },
               body: JSON.stringify(input)
   
           }) */

        e.preventDefault();

        const data = new FormData();
        /* data.append("file", uploadFile); */

        uploadFile.forEach(el => {
            data.append("file", el);
        })

        fetch('http://localhost:1000/user/adding/ad', {
            method: "POST",
            body: data,
        })

    }

    const getInputValue = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setInput(values => ({ ...values, [name]: value }));
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

    const showDeleteButton = (e) => {

        image.current = e.target.src;

        file.current = document.getElementById(e.target.name);

        if (e.target.src !== 'http://localhost:3000/image/download-image.png') {

            e.target.src = 'image/delete-icon.png';
        }

    }

    const hideDeleteButton = (e) => {

        if (e.target.src === 'http://localhost:3000/image/delete-icon.png') {

            e.target.src = image.current;

        }
    }

    const removeFile = (e) => {

        file.current.value = "";

        if (e.target.src === 'http://localhost:3000/image/delete-icon.png') {

            e.target.src = image.current;

            e.target.src = 'image/download-image.png';

            file.current.disabled = false;

            setInput(values => ({ ...values, [e.target.name]: "" }));
        }
    }

    return (

        <div className="addingContainer">
            <span>Добави обява</span>
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="title">Заглавие *</label>
                    <input className="form-input"
                        type="text"
                        onChange={getInputValue}
                        name="title"
                        value={input.name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Категория *</label>
                    <select onChange={getInputValue} name="category" value={input.name}>
                        <option value='electronic'>Елетроника</option>
                        <option value='tools'>Инструменти</option>
                        <option value='animals'>Животни</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="">Описание *</label>
                    <textarea
                        className="text-input"
                        type="text"
                        onChange={getInputValue}
                        name="description"
                        value={input.name}
                    />
                </div>

                <div className="input-box" id='input-box'>

                    <span>Снимки *</span>

                    <div className="image-upload">

                        <div className='option' >
                            <img alt="" className="del-image" src='image/delete-icon.png' />
                        </div>
                        <label htmlFor="input-1" className='input-1' onClick={removeFile}>
                            <img alt="" className="file-input" name="input-1" src="/image/download-image.png"
                                onMouseEnter={showDeleteButton}
                                onMouseLeave={hideDeleteButton} ref={image} />
                        </label>
                        <input
                            type="file"
                            id="input-1"
                            onChange={onChange}
                            name="input-1"
                            value={input.name || ''}
                        />
                    </div>

                    <div className="image-upload">
                        <label htmlFor="input-2" className='input-2' onClick={removeFile}>
                            <img alt="" className="file-input" name="input-2" src="/image/download-image.png"
                                onMouseEnter={showDeleteButton}
                                onMouseLeave={hideDeleteButton} ref={image} />
                        </label>
                        <input
                            type="file"
                            id="input-2"
                            onChange={onChange}
                            name="input-2"
                            value={input.name || ''}
                        />
                    </div>
                    <div className="image-upload">
                        <label htmlFor="input-3" className='input-3' onClick={removeFile}>
                            <img alt="" className="file-input" name="input-3" src="/image/download-image.png"
                                onMouseEnter={showDeleteButton}
                                onMouseLeave={hideDeleteButton} ref={image} />
                        </label>
                        <input
                            type="file"
                            id="input-3"
                            onChange={onChange}
                            name="input-3"
                            value={input.name || ''}
                        />
                    </div>
                    <div className="image-upload">
                        <label htmlFor="input-4" className='input-4' onClick={removeFile}>
                            <img alt="" className="file-input" name="input-4" src="/image/download-image.png"
                                onMouseEnter={showDeleteButton}
                                onMouseLeave={hideDeleteButton} ref={image} />
                        </label>
                        <input
                            type="file"
                            id="input-4"
                            onChange={onChange}
                            name="input-4"
                            value={input.name || ''}
                        />
                    </div>

                    <div className="image-upload">
                        <label htmlFor="input-5" className='input-5' onClick={removeFile}>
                            <img alt="" className="file-input" name="input-5" src="/image/download-image.png"
                                onMouseEnter={showDeleteButton}
                                onMouseLeave={hideDeleteButton} ref={image} />
                        </label>
                        <input
                            type="file"
                            id="input-5"
                            onChange={onChange}
                            name="input-5"
                            value={input.name || ''}
                        />
                    </div>

                </div>
                <div className="form-group">
                    <label htmlFor="">Локация *</label>
                    <input
                        className="form-input"
                        type="text"
                        onChange={getInputValue}
                        name="location"
                        value={input.name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Данни за контакт * </label>
                    <input
                        className="form-input"
                        type="text"
                        onChange={getInputValue}
                        name="contactData"
                        value={input.name}
                    />
                </div>
                <button id='adding'>Добави обява</button>
            </form>
        </div>

    )
}