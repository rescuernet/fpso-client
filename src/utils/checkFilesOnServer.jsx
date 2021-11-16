export const checkFilesOnServer = (path, fallback) => {
    return new Promise(resolve => {
        const img = new Image();
        img.src = path;
        img.onload = () => resolve(path);
        img.onerror = () => resolve(fallback);
    });
};