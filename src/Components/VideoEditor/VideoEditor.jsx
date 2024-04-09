import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BiSolidVideo } from "react-icons/bi";
import { BsFileEarmarkFill, BsFillDashSquareFill, BsQuestionCircleFill } from 'react-icons/bs';
import { FaBars, FaPlus } from 'react-icons/fa';
import { FiPlusCircle, FiScissors, FiSearch } from 'react-icons/fi';
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoMicOutline, IoMusicalNoteSharp } from 'react-icons/io5';
import { LiaSearchMinusSolid, LiaSearchPlusSolid } from "react-icons/lia";
import { RiSettings4Line, RiSettingsFill, RiText } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './VideoEdito.scss';
import SettingTab from './components/SettingTab/SettingTab';
import Timeline from './components/Timeline/Timeline';


const VideoEditor = () => {
    const sidebar = [
        { icon: <RiSettingsFill />, text: 'Setting', href: '/editor/setting', class: "settingIcon" },
        { icon: <FaPlus />, text: 'Media', href: '/#', class: "iconcontent" },
        { icon: <IoMusicalNoteSharp />, text: 'Audio', href: '/#', class: "iconcontent" },
        { icon: <BsFillDashSquareFill />, text: 'Suntitles', href: '/#', class: "icon1" },
        { icon: <RiText />, text: 'Text', href: '/#', class: "iconcontent" },
        { icon: <BsFileEarmarkFill />, text: 'Elements', href: '/#', class: "icon1 fileicon" },
        { icon: <BiSolidVideo />, text: 'Record', href: '/#', class: "iconcontent" },
    ]


    const handleAddMediaClick = () => document.getElementById('video-input').click();

    const projectSetting = useSelector(p => p.project)
    const [currentTime, setCurrentTime] = useState(0);
    const progressBar = useRef();
    const audioPlayer = useRef();
    const duration = 100; // Assuming duration is constant for this example


    const changeRange = (e) => {
        if (audioPlayer.current) {
            audioPlayer.current.volume = e.target.value / 100;
            changePlayerCurrentTime();
        }
    };
    const changePlayerCurrentTime = () => {
        if (progressBar.current) {
            progressBar.current.style.setProperty(
                "--seek-before-width",
                `${(progressBar.current.value / duration) * 100}%`
            );
            setCurrentTime(progressBar.current.value);
        }
    };


    return (
        <div className='videoEditorSection'>
            <div className='videoEditTabs'>
                <div className=''>
                    <Button>
                        <NavLink to="/home">
                            <FaBars />
                        </NavLink>
                    </Button>
                </div>
                <div className='tabsSection'>
                    <Button className='searchBtn'>
                        <span className='iconcontent'><FiSearch /></span>
                        <span className='title'>Search</span>
                    </Button>

                    {sidebar.map((item) => {
                        return <div className='tabsItem'>
                            <NavLink to={item.href}>
                                <span className={item.class}>{item.icon}</span>
                                {/* <span className='h'></span> */}
                                <span className='title'>{item.text}</span>
                            </NavLink>
                        </div>
                    })}
                </div>
                <div className='helpCenterTab'>
                    <button>
                        <span className='helpCenter'><BsQuestionCircleFill /></span>
                    </button>
                </div>
            </div>
            <div className='videoEditor'>
                <SettingTab />
                <div className='settingFootereditor'>
                    <div className='settingBottomHeader'>
                        <div className='videoEdit'>
                            <p><FiScissors /> Split</p>
                            <p onClick={handleAddMediaClick} ><FiPlusCircle /> Add media</p>
                            <p><IoMicOutline /> Voiceover</p>
                        </div>
                        <div className='volume-section'>
                            <span className='volumBtn'>
                                <HiOutlineSpeakerWave />
                            </span>
                            <div className='volumeContent'>
                                <LiaSearchMinusSolid />
                                <input
                                    type="range"
                                    className="mx-3 progressBar bar"
                                    defaultValue="0"
                                    ref={progressBar}
                                    onChange={changeRange}
                                />
                                <LiaSearchPlusSolid />
                                <span className='px-3'>fit</span>
                            </div>
                            <span className='settingcontent'>
                                <RiSettings4Line />
                            </span>
                        </div>
                    </div>
                    <Timeline handleAddMediaClick={handleAddMediaClick} />
                </div>
            </div>
        </div>
    )
}

export default VideoEditor;