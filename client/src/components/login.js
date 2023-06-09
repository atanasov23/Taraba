import { Link } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../services/authService';
import { Navigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useContext } from 'react';
import { userData } from '../context/auth';

export function Login() {

    const user_data = useContext(userData);

    const [input, setInput] = useState({});

    const [error, setError] = useState("");

    const [status, setStatus] = useState(false);

    async function sendData() {

        await login(input)
            .then(a => a.json())
            .then(a => {

                setError(a.response);

                if (a.response === undefined) {

                    user_data.setToken(a.token);

                    user_data.setUser(jwt_decode(a.token));

                    setStatus(status => status = a.login);

                }
            });

    }

    function change(e) {

        const name = e.target.name;
        const value = e.target.value;

        setInput(values => ({ ...values, [name]: value }));

    }

    function submit(e) {

        e.preventDefault();
    }

    return (
        <form onSubmit={submit} noValidate>
            {status ? <Navigate to='/'></Navigate> : ''}
            <section className="vh-100" style={{ padding: "300px" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                                <div className="card-body p-5 text-center">
                                    <h3 className="mb-5">Sign in</h3>
                                    <div id="err">{error}</div>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="email"
                                            id="typeEmailX-2"
                                            className="form-control form-control-lg"
                                            name="username"
                                            onChange={change}
                                            value={input.name}
                                        />
                                        <label className="form-label" htmlFor="typeEmailX-2">
                                            Username
                                        </label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            id="typePasswordX-2"
                                            className="form-control form-control-lg"
                                            name="password"
                                            onChange={change}
                                            value={input.name}
                                        />
                                        <label className="form-label" htmlFor="typePasswordX-2">
                                            Password
                                        </label>
                                    </div>

                                    <div className="form-check d-flex justify-content-start mb-4">

                                        <label className="form-check-label" htmlFor="form1Example3">
                                            {" "}
                                            <Link to='/register'>You don't have an account{" "}</Link>
                                        </label>
                                    </div>
                                    <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={sendData}>
                                        Login
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </form>

    )
}