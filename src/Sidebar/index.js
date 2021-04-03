import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import ChatRooms from '../ChatRooms/index.js';

import './Sidebar.css';

function Sidebar(props) {
    return (
        <div class="sidebar-container">
            <NavLink to="/profile" class = "profile-icon"><img src="/profile.png" /></NavLink>
            <NavLink to = "/webinars">Upcoming Webinars</NavLink>

            <ChatRooms />
            {/* <a href = "/profile"><img src = "/profile.png"/></a> */}

        </div>
    )
}

export default Sidebar;