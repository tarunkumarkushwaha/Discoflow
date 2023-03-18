import React from 'react'

const Navbar = () => {
  return (
    <>
    <div className="flex-row-center navbar">
    <img className='logo' src="src\assets\Discoflowlogo.png" alt="Disco flow" />
    <input type="text" placeholder="search your songs" name="search" id="search"/>
    </div>
    </>
  )
}

export default Navbar