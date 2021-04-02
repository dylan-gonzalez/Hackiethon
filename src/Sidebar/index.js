import React, { Component } from 'react';

import ChatRooms from '../ChatRooms/index.js';

import './Sidebar.css';

function Sidebar() {
    return (
        <div class = "sidebar-container">
            <a href = ""><img src = "/profile.png"/></a>
            <ChatRooms />

        </div>
    )
}

export default Sidebar;