import React from 'react';
import './Sidebar.css';

function SidebarRow({Icon,text}) {

  return (
    <div className="sidebar-row">
      <Icon sx={{fontSize: 16}}/>
      <p>{text}</p>
    </div>
  )
}

export default SidebarRow;