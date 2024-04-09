import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { RiFolderLine, RiHome6Line } from "react-icons/ri";
import { GrTemplate } from "react-icons/gr";
import { BsBroadcast } from "react-icons/bs";
import { CiVideoOn } from "react-icons/ci";
import { TbBrandFirebase } from "react-icons/tb";
import SideBar from './Header/SideBar';
import Navbar from './Header/Navbar';
import './Dashboard.scss'
import { FiScissors } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { IoMicOutline } from 'react-icons/io5';
import img1 from '../../Assets/photoimg.jpg'


const Dashboard = () => {
    const [toggled, setToggled] = useState(false);
    const [menuCollapse, setMenuCollapse] = useState(false);
    const handleCollapsedChange = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    let dataitems = [
        {
            title: 'Home',
            href: 'home',
            cName: "navlinks",
            icon: <RiHome6Line />,
        },
        {
            title: 'Templates',
            href: 'templates',
            cName: "navlinks",
            icon: <GrTemplate />,
        },
        {
            title: 'All Videos',
            href: 'videos',
            cName: "navlinks",
            icon: <RiFolderLine />,
        },
        {
            title: 'Poducts & Shows',
            href: 'poduct&shows',
            cName: "navlinks",
            icon: <BsBroadcast />,
        },
        {
            title: 'Brand Kit',
            href: 'brandkit',
            cName: "navlinks",
            icon: <TbBrandFirebase />,
        },
    ]

    let videoeditor = [
        { icon: <FiScissors />, text: "Create Project", href: "/editor", className: "createProject" },
        { icon: <CiVideoOn />, text: "Record Video", href: "", className: "recordVideo" },
        { icon: <BsBroadcast />, text: "Go Live", href: "", className: "goLive" },
        { icon: <IoMicOutline />, text: "Record Podcast", href: "", className: "recordPodcast" },
    ]
    return (
        <div
            // className={`app ${toggled ? 'toggled' : ''}`}
            className="dashboardSection"
        >
            <SideBar
                // image={image}
                collapsed={menuCollapse}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}
                dataitems={dataitems}
            />
            <div className='mainSection'>
                <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                    <FaBars />
                </div>
                <div>
                    <Navbar collapsed={menuCollapse}
                        toggled={toggled}
                        handleToggleSidebar={handleToggleSidebar}
                        handleCollapsedChange={handleCollapsedChange}
                    />
                    <div className='dashboardContentSection'>
                        <p className='createsome'> Let's create some <b>Videos!</b></p>
                        <div className='singleItems'>
                            {
                                videoeditor.map((item) => {
                                    return <Button className='item'>
                                        <NavLink to={item.href} className={item.className}>
                                            <span>{item.icon}</span> {item.text}
                                        </NavLink>
                                    </Button>

                                })
                            }
                        </div>
                    </div>
                    <div className='dashboardContentSection'>
                        <div className='d-flex justify-content-between'>
                            <p className='recentvideo'>My Recent Videos</p>
                            <p className='allvideos'> <NavLink>All Videos {`>`}</NavLink></p>
                        </div>
                        <div className='singleItems'>
                            <div className='videoItemSection'>
                                <div className='videoItem'>
                                    <img src={img1} alt="img1" />
                                    <p>Project Name</p>
                                    <span>10 minutes ago</span>
                                </div>
                                <p className='draftFilter'>Draft</p>
                                <p className='videoTimer'>00:46</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;