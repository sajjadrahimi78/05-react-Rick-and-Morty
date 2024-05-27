import React from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'

function Navbar() {
  return (
    <div className='navbar'>
        <div className="navbar__logo">😍 LOGO</div>
        <input type="text" name="" id="" className='text-field' placeholder='search...'/>
        <div className="navbar__result">Found X characters</div>
        <button className='heart'>
            <HeartIcon className='icon'/>
            <span className='badge'>4</span>
        </button>
    </div>
  )
}

export default Navbar