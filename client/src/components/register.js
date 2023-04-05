import { useState, useRef } from 'react';
import { registerInputValidation, registerDataValidation } from '../utils/inputValidation';
import { register } from '../services/authService';
import { Navigate } from 'react-router-dom';

export function Register() {

  const [input, setInput] = useState({});

  const [error, setError] = useState("");

  const currentPassword = useRef();

  const [status, setStatus] = useState(false);

  async function sendData() {

    const checkData = registerDataValidation(input);

    setError(checkData.err);

    if (checkData.send) {

      await register(input)
        .then(a => a.json())
        .then(a => {
          setError(a.response)
          setStatus(status => status = a.register)
        });
    }
  }

  function change(e) {

    if (e.target.name === 'password') {

      currentPassword.current = e.target.value;

    }

    setError(registerInputValidation(e.target, currentPassword));

    const name = e.target.name;
    const value = e.target.value;

    setInput(values => ({ ...values, [name]: value }));

  }

  function submit(e) {

    e.preventDefault();

  }

  return (

    <div className="registration-form">
      {status ? <Navigate to='/'></Navigate> : ''}
      <form onSubmit={submit}>
        <div className="form-icon">
          <span>
            <i className="icon icon-user" />
          </span>

        </div>
        <div id="err">{error}</div>
        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            id="username"
            name="username"
            value={input.name}
            onBlur={change}
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control item"
            id="password"
            name="password"
            value={input.name}
            onBlur={change}
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control item"
            id="confirmPassword"
            name="confirmPassword"
            value={input.name}
            onBlur={change}
            placeholder="Confirm Password"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            id="email"
            name="email"
            value={input.name}
            onBlur={change}
            placeholder="Email"
          />
        </div>

        <div className="form-group">
          <button className="btn btn-block create-account" onClick={sendData} >
            Create Account
          </button>
        </div>
      </form>

    </div>

  )
}