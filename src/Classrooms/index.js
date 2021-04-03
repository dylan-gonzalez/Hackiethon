import React, { Component } from 'react';

function Classrooms() {

    return (
        <div id="chatrooms">
          {chatData.user.classrooms.map(classroom => {
            let className = 'classroom';
            if (chatData.selectedClassroom && chatData.selectedClassroom.sid === chatroom[1]) {
              className += ' selected';
            }
            return (
              <button
                  className={className}
                  key={chatroom[1]}
                  id={chatroom[1]}
                  onClick={onClickChatroom}>
                {chatroom[0]}
              </button>
            );
          })}
        </div>
      );
}

export default Classrooms;