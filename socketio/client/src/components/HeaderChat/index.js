import React from "react";

import './style.scss'

const HeaderChat = ({ userCount }) => (
  <div className="header">
    <div className="header__left">
      <h3>{userCount} user in chat group</h3>
    </div>
  </div>
);

export default HeaderChat;
