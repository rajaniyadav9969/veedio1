import React, { memo } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { FiSearch, FiUserPlus } from "react-icons/fi";
import { Button } from 'react-bootstrap';
import { IoIosClose } from "react-icons/io";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import usericon from '../../../Assets/usericon.png'
import { IoFlash, IoNotificationsOutline } from "react-icons/io5";



const Navbar = ({ collapsed, handleToggleSidebar, handleCollapsedChange }) => {



    return (
        <div collapsed={collapsed} className="mainnavbar row">
            <div className="menuSearchSection col-md-2">
                <div className="toggleIcon"
                    onClick={handleCollapsedChange}
                >
                    {collapsed ? <MdArrowForwardIos /> : <MdArrowBackIos />}
                </div>
                <div className='searchSection'>

                    <input type="text" placeholder='Search' />
                    <span className='searchIocn'><FiSearch /></span>
                    <span className='closeIcon'><IoIosClose /></span>
                </div>

            </div>
            <div className="menubar col-md-5 ">
                <div className='upgradBtn'>
                    <Button>Upgrade <span><IoFlash /></span></Button>
                </div>
                <div className='inviteBtn'>
                    <Button>inviteBtn <span><FiUserPlus /></span></Button>
                </div>
                <div className='notifyIcon'>
                    <AiOutlineQuestionCircle />
                </div>
                <div className='notifyIcon'>
                    <IoNotificationsOutline />
                </div>
                <div className='users'>
                   <img src={usericon} alt="usericon" />
                </div>
            </div>
        </div >
    )
}

export default memo(Navbar)