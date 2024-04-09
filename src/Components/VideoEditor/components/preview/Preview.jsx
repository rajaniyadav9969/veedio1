import { fabric } from 'fabric';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import testVid from "../../../../Assets/vid.mp4";
import style from './Preview.module.scss';



function getVideoElement(url, id) {
    // const prev = document.getElementById(id)
    // if (prev) return prev

    const videoE = document.createElement('video');
    videoE.muted = true;
    videoE.crossOrigin = "anonymous";
    const source = document.createElement('source');
    source.src = url;
    source.type = 'video/mp4';
    source.width = 200
    source.height = 200
    videoE.appendChild(source);

    videoE.addEventListener('loadedmetadata', function () {
        const aspectRatio = videoE.videoWidth / videoE.videoHeight;
        videoE.width = aspectRatio > 1 ? 530 : 298 * aspectRatio;
        videoE.height = aspectRatio > 1 ? 530 / aspectRatio : 298;
        videoE.id = id
        console.log(videoE.width, videoE.height)
    });

    return videoE;
}

function getImageElement(url, id) {
    const prev = document.getElementById(id)
    if (prev) return prev

    const imageE = document.createElement('img');
    imageE.onload = function () {
        const aspectRatio = imageE.width / imageE.height;
        imageE.width = aspectRatio > 1 ? 530 : 298 * aspectRatio;
        imageE.height = aspectRatio > 1 ? 530 / aspectRatio : 298;
        imageE.id = id
        console.log(imageE.width, imageE.height)
    };
    imageE.src = url;
    return imageE;
}


function Preview() {

    const settings = useSelector(p => p.project);
    const canvasRef = useRef(null);
    const fabricRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return

        const [aspectRatioWidth, aspectRatioHeight] = settings.size.split(":")


        const parentWidth = canvas.parentNode.clientWidth;
        const parentHeight = canvas.parentNode.clientHeight;

        let width, height;

        // Calculate canvas dimensions based on which dimension is larger
        if (parentWidth * aspectRatioHeight >= parentHeight * aspectRatioWidth) {
            height = parentHeight * 0.9;
            width = height * (aspectRatioWidth / aspectRatioHeight);
        } else {
            width = parentWidth;
            height = width * (aspectRatioHeight / aspectRatioWidth);
        }

        fabricRef.current = new fabric.Canvas(canvasRef.current, {
            width: width, height: height,
            backgroundColor: settings.background.isColor ? settings.background.data : "black"
        });

        fabricRef.current.getObjects().forEach(obj => {
            if (obj.type !== 'background') {
                fabricRef.current.remove(obj);
            }
        });


        if (!settings.background.isColor && settings.background.data) {
            fabric.Image.fromURL(settings.background.data, function (img) {
                fabricRef.current.setBackgroundImage(img, fabricRef.current.renderAll.bind(fabricRef.current), {
                    scaleX: fabricRef.current.width / img.width,
                    scaleY: fabricRef.current.height / img.height
                });
            });
        }

        const saveCanvasData = () => {
            const data = JSON.stringify(fabricRef.current.toJSON());
            localStorage.setItem('canvasData', data);
        };

        // Load canvas data from localStorage
        const loadCanvasData = () => {
            const data = localStorage.getItem('canvasData');
            if (data) fabricRef.current.loadFromJSON(data, fabricRef.current.renderAll.bind(canvas),);
        };

        // loadCanvasData();

        // Event listener to save canvas data on changes
        fabricRef.current.on('object:modified', saveCanvasData);
        settings.media.data.map((item, i) => {
            if (!item.isVid) {
                const imgE = getImageElement(item.media, item.id)
                const fab_video = new fabric.Image(imgE, { left: 0, top: 0 });
                fabricRef.current.add(fab_video);
            } else {
                const videoE = getVideoElement(item.media, item.id);
                console.log(videoE)
                const fab_video = new fabric.Image(videoE, { left: 0, top: 0 });
                fabricRef.current.add(fab_video);
                fab_video.getElement().play();


            }

        })


        fabric.util.requestAnimFrame(function render() {
            fabricRef.current.renderAll();
            fabric.util.requestAnimFrame(render);
        });

        const rect = new fabric.Rect({
            top: 50,
            left: 50,
            width: 50,
            height: 50,
            fill: "red"
        });

        // fabricRef.current.add(rect);

        const videoE = getVideoElement(testVid, "lol");
        const fab_video = new fabric.Image(videoE, { left: 0, top: 0 });
        fabricRef.current.add(fab_video);
        fab_video.getElement().play();

        return () => {
            fabricRef.current.off('object:modified', saveCanvasData);
            fabricRef.current.dispose();
        };
    }, [settings]);


    return (
        <div className={style.editImgContent}>
            <canvas ref={canvasRef} className={style.editemedia}></canvas>
        </div>
    );
}

export default Preview;
