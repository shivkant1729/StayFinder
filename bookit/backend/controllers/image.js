const imageDownloader = require('image-downloader')
const image = async (req, res) => {
    const { link } = req.body;
    const newName = Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads' + newName
    })
    res.json(__dirname + '/uploads' + newName)
}
module.exports = { image };