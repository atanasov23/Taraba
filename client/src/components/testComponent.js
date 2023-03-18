import { useState } from "react";

export function Test() {

    const [file, setFile] = useState([]);

    /* const image = useRef();

    const file = useRef();

    const upload = (e) => {

        const fileReader = new FileReader();

        fileReader.readAsDataURL(e.target.files[0]);

        fileReader.addEventListener('load', () => {

            document.getElementsByName(e.target.id)[0].src = fileReader.result;

            e.target.disabled = true

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

        if (e.target.src == 'http://localhost:3000/image/delete-icon.png') {

            e.target.src = image.current;

        }
    }

    const removeFile = (e) => {

        file.current.value = "";

        if (e.target.src == 'http://localhost:3000/image/delete-icon.png') {

            e.target.src = image.current;

            e.target.src = 'image/download-image.png';

            file.current.disabled = false;
        }
    } */

    function send(e) {

        e.preventDefault();

        const data = new FormData();

        file.forEach(el => {
            data.append("file", el);
        })
        

        fetch('http://localhost:1000/adding', {
            method: "POST",
            body: data,
        })
    }

    

    return (
        <form action="#">
            <input type="file" name="file" onChange={(e) => setFile(oldArray => [...oldArray, e.target.files[0]] )}></input>
            <input type="file" name="file" onChange={(e) => setFile(oldArray => [...oldArray, e.target.files[0]] )}></input>
            <input type="file" name="file" onChange={(e) => setFile(oldArray => [...oldArray, e.target.files[0]] )}></input>
            <button onClick={send}>Prati</button>
        </form>
        

        /*  <>
             <div className="input-box">
 
                 <div className="image-upload">
 
                     <div className='option' >
                         <img className="del-image" src='image/delete-icon.png' />
                     </div>
                     <label htmlFor="input-1" className='input-1' onClick={removeFile}>
                         <img className="file-input" name="input-1" src="/image/download-image.png"
                             onMouseEnter={showDeleteButton}
                             onMouseLeave={hideDeleteButton} ref={image} />
                     </label>
                     <input type="file" id="input-1" onChange={upload} ></input>
                 </div>
 
                 <div className="image-upload">
                     <label htmlFor="input-2" className='input-2' onClick={removeFile}>
                         <img className="file-input" name="input-2" src="/image/download-image.png"
                             onMouseEnter={showDeleteButton}
                             onMouseLeave={hideDeleteButton} ref={image} />
                     </label>
                     <input type="file" id="input-2" onChange={upload}></input>
                 </div>
                 <div className="image-upload">
                     <label htmlFor="input-3" className='input-3' onClick={removeFile}>
                         <img className="file-input" name="input-3" src="/image/download-image.png"
                             onMouseEnter={showDeleteButton}
                             onMouseLeave={hideDeleteButton} ref={image} />
                     </label>
                     <input type="file" id="input-3" onChange={upload}></input>
                 </div>
                 <div className="image-upload">
                     <label htmlFor="input-4" className='input-4' onClick={removeFile}>
                         <img className="file-input" name="input-4" src="/image/download-image.png"
                             onMouseEnter={showDeleteButton}
                             onMouseLeave={hideDeleteButton} ref={image} />
                     </label>
                     <input type="file" id="input-4" onChange={upload}></input>
                 </div>
 
                 <div className="image-upload">
                     <label htmlFor="input-5" className='input-5' onClick={removeFile}>
                         <img className="file-input" name="input-5" src="/image/download-image.png"
                             onMouseEnter={showDeleteButton}
                             onMouseLeave={hideDeleteButton} ref={image} />
                     </label>
                     <input type="file" id="input-5" onChange={upload}></input>
                 </div>
             </div>
         </>
     ) */
    )
}

