import { Link } from 'react-router-dom';

export function CategoryView() {

    return (

        <div className="category-container">

            <div className='category-box'>
                <Link to="/electronic">
                    <img src='image/electronics.png' />
                </Link>
            </div>

            <div className='category-box'>
                <Link to="/tools">
                    <img src='image/tools.png' />
                </Link>
            </div>

            <div className='category-box'>
                <Link to="/animals">
                    <img src='image/dog.png' />
                </Link>
            </div>

            <div className='category-box'>
                <Link to="/service">
                    <img src='image/service.png' />
                </Link>
            </div>

            <div className='category-box'>
                <Link to="/cars">
                    <img src='image/cars.png' />
                </Link>
            </div>

        </div>
    )

}