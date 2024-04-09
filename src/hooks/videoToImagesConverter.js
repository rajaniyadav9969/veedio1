
export const convertVideoToImages = async (src, fps) => {
  const videoElement = document.createElement('video');
  videoElement.src = src;

  await new Promise(resolve => {
    videoElement.onloadedmetadata = () => resolve();
  });

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const width = videoElement.videoWidth;
  const height = videoElement.videoHeight;

  canvas.width = width;
  canvas.height = height;

  const totalFrames = Math.floor(videoElement.duration * fps);

  const newImages = [];

  for (let i = 0; i < totalFrames; i++) {
    const currentTime = i / fps;
    videoElement.currentTime = currentTime;
    await new Promise(resolve => {
      videoElement.onseeked = () => {
        context.drawImage(videoElement, 0, 0, width, height);
        const imageData = canvas.toDataURL('image/jpeg', 1.0);
        newImages.push(imageData);
        resolve();
      };
    });
  }

  return newImages;
};

