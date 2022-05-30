const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')
const fs = require('fs')

cloudinary.config({
    cloud_name: 'dmx182kqu',
    api_key: 864467264612754,
    api_secret: '_caALyjhgLP4WmSyn0P8mGh9AsI'
})

// Upload image
router.post('/upload', auth, authAdmin, (req, res) => {
    try {
        console.log(req.files)

        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).send('No files were uploaded')

        const file = req.files.file

        if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: 'Size too large' })
        }

        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: 'File format is incorrect' })
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "test" }, async (err, result) => {
            if (err) throw err
            removeTmp(file.tempFilePath)
            res.json({ public_id: result.public_id, url: result.secure_url })
        })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

// Delete image
router.post('/destroy', auth, authAdmin, (req, res) => {

    try {
        const { public_id } = req.body
        if (!public_id) return res.status(400).json({ msg: 'No images selected' })
        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err
            res.json({ msg: 'Deleted Image' })
        })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }

})



// After upload will have tmp file, u can use this function to remove tmp file
const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}

module.exports = router