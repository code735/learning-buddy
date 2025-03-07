import React from 'react'
import Leftsidebar from '../Leftsidebar/Leftsidebar'
import Pageeditor from '../Pageeditor/Pageeditor'
import Rightsidebar from '../RightSidebar/Rightsidebar'
import Navbar from '../Navbar/Navbar'

export default function MasterContainer() {
  return (
    <div className="main-container">
      <Navbar />
      <div className="sidebar-and-editor-container">
        <Leftsidebar />
        <Pageeditor />
        <Rightsidebar />
      </div>
    </div>
  )
}
