import React from 'react';
import { ChatContext } from '../App.js';
import { css, /*jsx*/ } from '@emotion/core';

function LoginForm(props) {
  const chatData  = React.useContext(ChatContext);
  const userInput = React.useRef();
  const [error, setError] = React.useState(false);
  const login = (ev) => {
    if (ev.type === 'keyup' && ev.key !== 'Enter') {
      return;
    }
    setError(false);
    chatData.login(userInput.current.value).catch(() => setError(true));
    props.history.push('/main');

  }
  const logout = () => chatData.logout();

  if (chatData.user.username === null) {
    return (
      <div id="login">
        <div>
          Username:&nbsp;
          <input type="text" ref={userInput} onKeyUp={login} autoFocus />
          &nbsp;
          <button onClick={login}>Login</button>
          {error && <>&nbsp;Login error, please try again.</>}
        </div>
      </div>
    );
  }
  else {
    return (
      <div id="login" css={[LoginCSS]}>
        <div>
          Username: <b>{chatData.user.username}</b>&nbsp;
          {props.history.location.pathname === "/webinars" ? '' : <button onClick={logout}>Logout</button>}

        </div>
      </div>
    );
  }
}

export default LoginForm;

const LoginCSS = css`
  .but {
    position:fixed;
    color:red;
    font-size: 100px;
  }
`