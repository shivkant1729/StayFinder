const fs = require('fs');
const path = require('path');

const uploadfile = async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path: tempPath, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = `${tempPath}.${ext}`;
        fs.renameSync(tempPath, newPath);

        // Normalize the path to use forward slashes
        const normalizedPath = newPath.replace(/\\/g, '/').replace('uploads/', '');
        uploadedFiles.push(normalizedPath);
    }
    res.json(uploadedFiles);
};

module.exports = { uploadfile };
