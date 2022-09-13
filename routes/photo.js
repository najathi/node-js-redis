const express = require("express")
const router = express.Router()

const { getPhotos, getPhotoById } = require('../controllers/photo')

router.get("/", getPhotos)
router.get("/:id", getPhotoById)

module.exports = router