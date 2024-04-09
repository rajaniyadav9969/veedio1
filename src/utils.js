export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);

        if (file instanceof Blob) {
            reader.readAsDataURL(file);
        } else {
            reject(new Error('Invalid file type'));
        }
    });
}