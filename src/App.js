<<<<<<< HEAD
import React, { Fragment, useEffect } from 'react';
import Conversations from '@twilio/conversations';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
=======
import React from 'react';
import Conversations from '@twilio/conversations';
>>>>>>> classroom-channels

import LoginForm from './LoginForm/index.js';
import ChatRooms from './ChatRooms/index.js';
import ChatLog from './ChatLog/index.js';
import ChatInput from './ChatInput/index.js';
import Sidebar from './Sidebar';
<<<<<<< HEAD
import UserProfile from './UserProfile';

import './App.css';
import Webinars from './Webinars/index.js';
=======

import './App.css';
>>>>>>> classroom-channels

export const ChatContext = React.createContext();

function App() {
  const [user, setUser] = React.useState({api: null, username: null, chatrooms: [], classrooms: []});
  const [selectedChatroom, setSelectedChatroom] = React.useState(null);
<<<<<<< HEAD

  const chatData = {
    user: user,
    selectedChatroom: selectedChatroom,
  
  }
  // useEffect(() => {
  //   fetch("/time").then(res => res.json()).then(data => {
  //     setCurrentTime(data.time);
  //   })
  // }, []);
=======
  const [showProfile, setShowProfile] = React.useState(false);

  const chatData = {
    user: user,
    selectedChatroom: selectedChatroom,

    login: (_username) => {
      document.body.style.cursor = 'progress';
      return fetch('/login', {
        method: 'POST',
        body: JSON.stringify({username: _username})
      }).then(res => res.json()).then(data => {
        Conversations.create(data.token).then(client => {
          document.body.style.cursor = 'default';
          setUser({
            api: client,
            username: _username,
            chatrooms: data.chatrooms,
          });
        });
      }).catch((error) => {
        document.body.style.cursor = 'default';
        throw error;
      });
    },

    logout: () => {
      setUser({api: null, username: null, chatrooms: [], classrooms: []});
      setSelectedChatroom(null);
    },

    selectChatroom: (sid) => {
      user.api.getConversationBySid(sid).then(conv => {
        setSelectedChatroom(conv);
      });  
    },

  }
>>>>>>> classroom-channels

  return (
    <div className="App">
      <h1>Twilio Conversations API Demo</h1>
<<<<<<< HEAD
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
=======
      <ChatContext.Provider value={chatData}>
        <LoginForm />
        {chatData.user.username !== null &&
          <div id="chat">
          {/* <ChatRooms /> */}
            <Sidebar />
            <ChatLog />
            <ChatInput />
            {/* <UserProfile /> */}

          </div>
        }
>>>>>>> classroom-channels
      </ChatContext.Provider>
    </div>

  );
}

export default App;