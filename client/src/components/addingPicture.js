export function AddingPicture(props) {

    return (
        <div className="input-box" id='input-box'>

            <span>Снимки</span>

            <div className="image-upload">

                <div className='option' >
                    <img alt="" className="del-image" src='image/delete-icon.png' />
                </div>
                <label htmlFor="pic-1" className='pic-1'>
                    <img alt="" className="file-input" name="pic-1" src="/image/download-image.png" />
                </label>
                <input
                    type="file"
                    id="pic-1"
                    onChange={props.onChange}
                    name="pic-1"
                    value={props.input.name || ''}
                />
            </div>

            <div className="image-upload">
                <label htmlFor="pic-2" className='pic-2'>
                    <img alt="" className="file-input" name="pic-2" src="/image/download-image.png" />
                </label>
                <input
                    type="file"
                    id="pic-2"
                    onChange={props.onChange}
                    name="pic-2"
                    value={props.input.name || ''}
                />
            </div>
            <div className="image-upload">
                <label htmlFor="pic-3" className='pic-3'>
                    <img alt="" className="file-input" name="pic-3" src="/image/download-image.png" />
                </label>
                <input
                    type="file"
                    id="pic-3"
                    onChange={props.onChange}
                    name="pic-3"
                    value={props.input.name || ''}
                />
            </div>
            <div className="image-upload">
                <label htmlFor="pic-4" className='pic-4'>
                    <img alt="" className="file-input" name="pic-4" src="/image/download-image.png" />
                </label>
                <input
                    type="file"
                    id="pic-4"
                    onChange={props.onChange}
                    name="pic-4"
                    value={props.input.name || ''}
                />
            </div>

            <div className="image-upload">
                <label htmlFor="pic-5" className="pic-5">
                    <img alt="" className="file-input" name="pic-5" src="/image/download-image.png" />
                </label>
                <input
                    type="file"
                    id="pic-5"
                    onChange={props.onChange}
                    name="pic-5"
                    value={props.input.name || ''}
                />
            </div>

        </div>
    )

}