import React, { Fragment, useEffect } from 'react';
import Conversations from '@twilio/conversations';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import LoginForm from './LoginForm/index.js';
import ChatRooms from './ChatRooms/index.js';
import ChatLog from './ChatLog/index.js';
import ChatInput from './ChatInput/index.js';
import Sidebar from './Sidebar';
import UserProfile from './UserProfile';

import './App.css';
import Webinars from './Webinars/index.js';

export const ChatContext = React.createContext();

function App() {
  const [user, setUser] = React.useState({api: null, username: null, chatrooms: [], classrooms: []});
  const [selectedChatroom, setSelectedChatroom] = React.useState(null);

  const chatData = {
    user: user,
    selectedChatroom: selectedChatroom,
  
  }
  // useEffect(() => {
  //   fetch("/time").then(res => res.json()).then(data => {
  //     setCurrentTime(data.time);
  //   })
  // }, []);

  return (
    <div className="App">
      <h1>Twilio Conversations API Demo</h1>
      {/* <ChatContext.Provider value={chatData}>
        <LoginForm />
        {chatData.user.username !== null &&
          <div id="chat">
          <Sidebar/>
          <ChatLog />
          <ChatInput />

          </div>
        }
      </ChatContext.Provider> */}
      <ChatContext.Provider value={chatData}>
        <HashRouter>
          <Route path = "/" component = {LoginForm} />
          {chatData.user.username !== null &&
            <div>
              <div id="chat">
              <Route path="/main" render={() =>
                    <Fragment>
                      <Sidebar/>
                      <ChatLog />
                      <ChatInput />
                    </Fragment>
            }/>
            </div>
            <Route path="/profile" component={UserProfile} />
            <Route path = "/webinars" component = {Webinars} />
            </div>
          }
        </HashRouter>
      </ChatContext.Provider>
    </div>

  );
}

export default App;
