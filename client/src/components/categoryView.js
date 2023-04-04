import { Link } from 'react-router-dom';

export function CategoryView() {

    return (

        <div className="category-container">

            <div className='category-box'>
                <Link to="/electronic">
                    <img src='/image/electronics.png' alt=""/>
                </Link>
                 <p>Елетроника</p>
            </div>

            <div className='category-box'>
                <Link to="/tools">
                    <img src='/image/tools.png' alt=""/>
                </Link>
                <p>Инструменти</p>
            </div>

            <div className='category-box'>
                <Link to="/animals">
                    <img src='/image/dog.png' alt=""/>
                </Link>
                <p>Животни</p>
            </div>

            <div className='category-box'>
                <Link to="/service">
                    <img src='/image/service.png' alt=""/>
                </Link>
                <p>Услуги</p>
            </div>

            <div className='category-box'>
                <Link to="/cars">
                    <img src='/image/cars.png' alt=""/>
                </Link>
                <p>Коли</p>
            </div>

            <div className='category-box'>
                <Link to="/all">
                    <img src='/image/all.png' alt=""/>
                </Link>
                <p>Всички</p>
            </div>

        </div>
    )

}