const imageDownloader = require('image-downloader');
const path = require('path');
const url = require('url');
const fs = require('fs');

const upload = async (req, res) => {
    const { link } = req.body;
    const newName = Date.now() + '.jpg';
    const desti = path.resolve(__dirname, '../uploads', newName);

    // Validate the URL
    const parsedUrl = url.parse(link);
    if (!parsedUrl.protocol) {
        return res.status(400).json({ error: 'Invalid URL.' });
    }

    try {
        if (parsedUrl.protocol === 'data:') {
            // Handle data URL
            const base64Data = link.split(',')[1]; // Get the base64 data
            const buffer = Buffer.from(base64Data, 'base64');
            fs.writeFileSync(desti, buffer);
        } else if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
            // Handle http/https URL
            await imageDownloader.image({
                url: link,
                dest: desti
            });
        } else {
            return res.status(400).json({ error: 'Unsupported URL protocol. Only http, https, and data are supported.' });
        }
        res.json(newName); // Send newName directly
    } catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).json({ error: 'Failed to download image.' });
    }
}

module.exports = { upload };
