import React, { Component, useState } from 'react';
import { ChatContext } from '../App.js';

function UserProfile() {
    const [classes, setClasses] = useState([])
    const chatData  = React.useContext(ChatContext);



    return (
        <div>
            <h1>Name: {chatData.username}</h1>
        </div>
    )

}

export default UserProfile;