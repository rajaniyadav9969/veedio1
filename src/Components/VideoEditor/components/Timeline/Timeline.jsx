import React, { useRef } from 'react';
import toast from 'react-hot-toast';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { convertVideoToImages } from '../../../../hooks/videoToImagesConverter';
import { addMedia } from '../../../../redux/projectSlice';
import styles from './Timeline.module.scss'; // Import your SCSS file for styling

const Timeline = ({ handleAddMediaClick }) => {
  const media = useSelector(p => p.project.media)

  const dispatch = useDispatch()

  const handleVideoChange = async (event) => {
    const file = event.target.files[0]
    const src = URL.createObjectURL(event.target.files[0]);
    console.log({ file })
    let frames = []
    if (file.type.includes("video")) {
      frames = await toast.promise(
        convertVideoToImages(src, 1),
        {
          loading: `${file.name} Uploading...`,
          success: <b>Upload successful</b>,
          error: <b>Could not upload.</b>,
        }
      );
      console.log(frames);
    }

    dispatch(addMedia({ media: src, frames }))
  };


  const containerRef = useRef(null);
  let prevX = 0;

  const handleMouseDown = (event) => {
    prevX = event.clientX;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event) => {
    const deltaX = event.clientX - prevX;
    prevX = event.clientX;
    containerRef.current.style.left = `${containerRef.current.offsetLeft + deltaX}px`;
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };


  return (
    <div className={styles['timeline-container']}>

      <div
        ref={containerRef}
        className={styles.arrawSection}
        onMouseDown={handleMouseDown}
      >
        <IoMdArrowDropdown />
        <div className={styles.arrow}></div>
      </div>

      <div className={styles.wrapper}>

        <div className={styles['time-series']}>
          {new Array(media.length + 13).fill().map((e, i) => (
            <div key={i}>{i % 5 == 0 ? `${Math.round(i)}s` : "."}</div>
          ))}
        </div>
        <div className={styles.timeline}>
          {media.data.map(med => (
            med.frames.map((image, index) => (
              <img key={`${med.id}-${index}`} src={image} alt={`frame-${index}`} className={styles['timeline-image']} />
            ))
          ))}
        </div>
      </div>


      {media.data.length === 0 ?
        <>
          <div className={styles['add-media-btn']} onClick={handleAddMediaClick}>
            Add Media
          </div>
        </> :
        ''
      }
      <input id="video-input" type="file" style={{ display: 'none' }} onChange={handleVideoChange} />
    </div>
  );
}

export default Timeline;
