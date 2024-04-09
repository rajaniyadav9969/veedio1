import React, { useEffect, useRef, useState } from 'react'
import { Popover, Select } from 'antd'
import { Form } from 'react-bootstrap'
import { BsInstagram, BsTiktok, BsYoutube } from 'react-icons/bs'
import { SiYoutubeshorts } from "react-icons/si";
import { FaLinkedin } from 'react-icons/fa'
import { SketchPicker } from 'react-color'
import { BiSolidColorFill } from 'react-icons/bi'
import { FiUploadCloud, FiUserPlus } from 'react-icons/fi'
import { MdOutlineTranslate } from 'react-icons/md'
import { PiArrowBendUpLeftLight, PiArrowBendUpRightLight, PiStarFour } from "react-icons/pi";
import { IoCheckmarkOutline, IoExtensionPuzzleOutline, IoFlash } from 'react-icons/io5';
import img2 from '../../../../Assets/photoimg.jpg';
import './SettingTab.scss'
import { useDispatch, useSelector } from 'react-redux';
import { updateValues } from '../../../../redux/projectSlice';
import Preview from '../preview/Preview';
import { fileToBase64 } from '../../../../utils';

const SettingTab = () => {
  const optionsitem = [
    { value: "16:9", label: "YouTube", icon: <BsYoutube />, class: 'youtube' },
    { value: "9:6", label: "YouTube Short", icon: <SiYoutubeshorts />, class: 'youtube' },
    { value: "9:16", label: "TikTok", icon: <BsTiktok />, class: 'socialicon' },
    { value: "1.11", label: "Instagram Post", icon: <BsInstagram />, class: 'socialicon' },
    { value: "9:26", label: "Instagram Reel", icon: <BsInstagram />, class: 'socialicon' },
    { value: '1.1', label: "LinkedIn", icon: <FaLinkedin />, class: 'socialicon' },
  ]

  const projectSetting = useSelector(p => p.project)
  const dispatch = useDispatch()

  const onHandleChange = (e) => {
    dispatch(updateValues({name: e.target.name, value: e.target.value}))
  }


  const handleFileChange = async (event) => {

    const file = event.target.files[0]

    if (file) {
      try {
          const base64Data = await fileToBase64(file);
          dispatch(updateValues({name: "background", value: {isColor: false, data: base64Data}}))
      } catch (error) {
          console.error('Error converting file to base64:', error);
      }
    }
  };
  return (
    <div className=' projectSettingSection'>
      <div className=" projectSetting">
        <div className='settingTitle scrollingdiv'>
          <h2 >Project Settings</h2>
        </div>
        <div className='settingStyleSetion'>
          <div >
            <span className='styleSize'>Size</span>
            <Select
              // mode="multiple"
              name="clustername"
              className='antdSelect'
              allowClear
              id="size"
              showSearch={true}
              style={{ width: "100%" }}
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              onChange={(value => dispatch(updateValues({name: "size", value})))}
              value={projectSetting?.size}
              options={optionsitem.map(item => {
                return { label: <><span className={item.class}>{item.icon}</span> {item.label} <span style={{ color: "#c2c4c8", fontSize: '11px' }}>({item.value})</span></>, value: item.value }
              })}
            />
          </div>
          <div >
            <span className='styleSize'>Background</span>
            <div className='filterContainer'>
              <div className='filterContent'>
                <Form.Check type="radio" label="Color"
                  onChange={(e) => dispatch(updateValues({name: "background", value: {isColor: true, value: "#000"}}))}
                  checked={projectSetting?.background.isColor}
                />
                <p className={`${projectSetting?.background.isColor ? 'content' : 'toggled colorStyle'}`}>
                  {projectSetting.background.isColor && (projectSetting.background.data ?? "rgba(0,0,0,0)")}
                  <Popover
                    content={
                      <SketchPicker className='colorpicker'
                        onChange={(color) => dispatch(updateValues({name: "background", value: {isColor: "color", data: color.hex}}))}
                        color={projectSetting}
                      />
                    }
                  >
                    <span
                      style={{ backgroundColor: projectSetting.background.data, borderRadius: '50%', height: '1.3rem', width: '1.3rem', display: 'inline-grid', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <BiSolidColorFill onClick={() => handleVisibility()} />
                    </span>
                  </Popover>
                </p>
              </div>
              <div className='filterContent'>
                <Form.Check type="radio" label="Image"
                  onChange={(e) => dispatch(updateValues({name: "background", value: {isColor: false, value: e.target.value}}))}
                  checked={!projectSetting?.background.isColor}
                />
                <p className={`${!projectSetting?.background.isColor  ? 'content' : ' toggled'}`}
                  style={{ cursor: 'pointer' }}
                >
                  <label htmlFor="file-upload" className="custom-file-upload" >upload
                    <FiUploadCloud style={{marginLeft: '7px'}}/>
                  </label>
                  <input onChange={handleFileChange} id="file-upload" type="file" style={{ display: "none",visibility:projectSetting?.background.isColor && 'hidden'}} />
                </p>
              </div>
            </div>
          </div>
          <div >
            <span className='styleSize'>Audio</span>
            <div className=' audio-container'>
              <div className='audiocontent'>
                <div className='icon'><MdOutlineTranslate /></div>
                <div className='content'>
                  <span>Translate voice</span>
                  <span>Add voice translations in multi-languages</span>
                </div>
                <p>BETA</p>

              </div>
              <div className='audiocontent'>
                <div className='d-flex'>
                  <div className='icon'><PiStarFour /></div>
                  <div className='content'>
                    <span>Clean Audio</span>
                    <span>Remove background noise</span>
                  </div>
                </div>
                <p className='flashIcon'><IoFlash /></p>

              </div>
            </div>
          </div>
          <div >
            <span className='styleSize'>Duration</span>
            <div className='filterContainer'>
              <div className='filterContent'>
                <Form.Check
                  type="radio"
                  label="Automatic"
                  id="automatic"
                  value="automatic"
                  onChange={onHandleChange}
                  name="duration"
                  checked={projectSetting?.duration == "automatic"}
                  className=""

                />
              </div>
              <div className='filterContent'>
                <Form.Check
                  type="radio"
                  label="Fixed"
                  id="fixed"
                  value="fixed"
                  onChange={onHandleChange}
                  name="duration"
                  checked={projectSetting?.duration == "fixed"}
                  className=""
                />
                <p>
                  01:00.0
                </p>
              </div>
            </div>
          </div>
          <div >
            <span className='styleSize'>Frames Per Second</span>
            <Select
              // mode="multiple"
              name="clustername"
              className='antdSelect'
              allowClear
              showSearch={true}
              style={{ width: "100%" }}
              optionFilterProp="children"
              onSelect={(value) => dispatch(updateValues({name: "frames", value}))}
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              value={projectSetting?.frames}
              options={[
                { value: '30', labal: 30 },
                { value: '60', labal: 60 },
                { value: '50', labal: 50 },
                { value: '10', labal: 10 },
                { value: '20', labal: 20 },
                { value: '25', labal: 25 },
              ]}
            />


          </div>
          <div >
            <span className='styleSize'>Version History</span>
            <div className=' audio-container'>

              <div className='audiocontent'>
                <div className='d-flex'>
                  <div style={{
                    fontSize: '1.6rem',
                    color: ' rgb(113, 115, 124)'
                  }}><IoExtensionPuzzleOutline /></div>
                  <div className='content'>
                    <span>Restore to a previous version</span>
                    <span>Creates a new project</span>
                  </div>
                </div>

              </div>
            </div>
            {/* <div className='filterContainer audio-container'>
           
          </div> */}

          </div>
        </div>
      </div>
      <div className="projectSelectionSection">
        <div className='projectHeader'>
          <div className='projectName'><h4>Project Name </h4></div>
          <div className='headerInfoContent'>
            <div className='undo-renduBtn-section'>
              <span><PiArrowBendUpLeftLight /></span>
              <span><PiArrowBendUpRightLight /></span>
            </div>
            <div className='borderArror'></div>
            <div className='btnSection'>
              <button className='invite'>Invite <span><FiUserPlus /></span></button>
            </div>
            <div className='btnSection'>
              <button className='done'>Done <span><IoCheckmarkOutline /></span></button>
            </div>
          </div>
        </div>
        <Preview/>
      </div>
    </div>
  )
}

export default SettingTab
