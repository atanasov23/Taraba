export default function Search() {

    return (
        <div className="container">
            <div className="row height d-flex justify-content-center align-items-center">
                <div className="col-md-8">
                    <div className="search">
                        <i className="fa fa-search" />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Търсене"
                        />
                        <button className="btn btn-primary">Търсене</button>
                    </div>
                </div>
            </div>
        </div>
    )
}