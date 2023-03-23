import { useState, useEffect } from 'react';

export function EditPicture(props) {

    /* const [length, setLength] = useState(0); */

    const [ input, setInput ] = useState([]);

    useEffect(() => {

       /*  setLength(length => length = 5 - props.oldData.pictures.length); */

    }, [])
    

    if(props.oldData.pictures !== undefined){

        setInput(input => input = Array.from({length: 3}, (_, index) => {
                return index ;
              })) 

    }

    console.log(input);
 /*    const threeHeaders = Array.from({length: 4}, (_, index) => { 
        return index ;
      });

      console.log(threeHeaders); */

    return (
        <div className="input-box" id='input-box'>

            <span>Снимки</span>
            {props.oldData.pictures !== undefined ?
                props.oldData.pictures.map((a, b) => <div className="image-upload">

                    <div className='option' >
                        <img alt="" className="del-image" src='image/delete-icon.png' />
                    </div>
                    <label htmlFor={`pic-${b + 1}`} className={`pic-${b + 1}`}>
                        <img alt="" className="file-input" name={`pic-${b + 1}`} src={`http://localhost:1000/${a}`} />
                    </label>
                    <input
                        type="file"
                        id={`pic-${b + 1}`}
                        onChange={props.onChange}
                        name={`pic-${b + 1}`}
                        value={props.input.name || ''}
                    />
                </div>) : ''

            }


        </div>
    )

}