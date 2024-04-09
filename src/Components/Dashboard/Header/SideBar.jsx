import React, { memo, useState } from 'react'
import "react-pro-sidebar/dist/css/styles.css";
import {
    ProSidebar,
    Menu,
    SidebarHeader,
    SidebarContent, MenuItem
} from "react-pro-sidebar";
import { CgClose } from "react-icons/cg";
import '../Header/Header.scss'
import logo from '../../../Assets/veed-io.png'
import { NavLink } from 'react-router-dom';

const SideBar = ({
    collapsed,
    toggled,
    handleToggleSidebar,
    handleCollapsedChange,
    dataitems
}) => {
    // console.log(dataitems);
    const handleTabs = () => {
        (window.innerWidth < 960) && (handleToggleSidebar())
        // (props.menuCollapse ? props.setMenuCollapse(false) : props.setMenuCollapse(true))
    }

    return (
        <div className='sidebarSection'>

            <ProSidebar
                collapsed={collapsed}
                toggled={toggled}
                onToggle={handleToggleSidebar}
                breakPoint="md"
            >
                <div id="header">
                    <div className="menuicon"
                        onClick={() => handleToggleSidebar(false)}
                    >
                        {collapsed ? <CgClose /> : <CgClose />}
                    </div>

                    <SidebarHeader>
                        {collapsed ?
                            <div className="logo">
                                <img className="responsive-img" src={logo} alt="" />

                            </div >
                            :
                            <div className="logo">
                                <img className="responsive-img" src={logo} alt="" />
                            </div>
                        }
                    </SidebarHeader>
                    {/* <div className='user-section'>
                        <div className='user-information'>
                            <h6 className="user-username">d;kgjkd</h6>
                            <h6 className="user-rolename">fkdgptfj </h6>
                        </div>
                    </div> */}
                    <SidebarContent>
                        <Menu iconShape="square" className={collapsed ? "navmenu collapsed" : "navmenu"}>
                            <MenuItem className='singleitem '>
                                <div className=' newBtn'>
                                    <p
                                        // to={item.href}
                                        className="sublink1"
                                    // onClick={handleTabs}
                                    >
                                        New Video
                                        <span className='menuicons1'>
                                            +
                                        </span>
                                    </p>
                                </div>
                            </MenuItem>
                            {
                                dataitems.map((item, index) => {
                                    return <MenuItem key={index} className='singleitem'>
                                        <div className='singlemenu' >
                                            <NavLink
                                                to={item.href}
                                                className="sublink1"
                                                onClick={handleTabs}
                                            >
                                                <span className='menuicons1'>
                                                    {item.icon}
                                                </span>
                                                {item.title}
                                            </NavLink>
                                        </div>
                                    </MenuItem>
                                })
                            }
                            {/* {dataitems.map((item, index) => {
                                // const depthLevel = 0;
                                return  <MenuItem key={index} className='singleitem '>
                                    <div className='singlemenu' >
                                        <NavLink
                                            to={item.href}
                                            className="sublink1"
                                            // onClick={handleTabs}
                                        >
                                            <span className='menuicons1'>
                                                 {item.icon}
                                            </span>
                                            {item.title}
                                        </NavLink>
                                    </div>
                                </MenuItem>
                                
                            })} */}

                        </Menu>

                    </SidebarContent>
                </div>
                <div className='sidebar-bottom-Section'>


                    <div className="logout">
                        sdg;lf
                    </div>
                </div>

            </ProSidebar>
        </div>
    )
}
export default memo(SideBar)