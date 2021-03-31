import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import { LIVE_CHAT, SIGN_IN, SIGN_UP } from "constants/variables";
import 'style.scss'


const SingIn = ({ location }) => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [isFailure, setIsFailure] = useState(false)

  const handleSignIn = () => {
    axios.post(`${URL}/login`, {
      email, password 
    })
    .then(function (response) {
      console.log("🚀 ~ file: index.js ~ line 21 ~ response", response)
      if(response.data.isSuccess === true) {
        history.push(`/chat?email=${email}`);
      } else {
        history.push("/sign-in");
        setIsFailure(true)
      }
    })
    .catch(function (error) {
      history.push("/sign-in");
      setIsFailure(true)
    });
  };

  return (
    <div className="sign-in">
      <h1 className="sign-in__header">{LIVE_CHAT}</h1>
      <div className="sign-in__box">
        <div>
          <input
            placeholder="Email"
            className="sign-in__input"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            placeholder="Mật khẩu"
            className="sign-in__input mt-20"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div> 
        <button className="sign-in__button mt-20 " type="submit" onClick={handleSignIn}>
          {SIGN_IN}
        </button>
        <div className="sign-in__fail-text">{isFailure ? 'Email hoặc mật khẩu không chính xác' : ''}</div>
        {/* <Link to={`/sign-up`}> */}
          <button
            className={
              "sign-in__button sign-in__button--green sign-in__button--small mt-20"
            }
            type="submit"
            onClick={() => history.push('/chat', {state: {user: 'Hieu'}})}
          >
            {SIGN_UP}
          </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default SingIn;
