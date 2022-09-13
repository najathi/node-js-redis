const { redisClient } = require('../util/redis-helper')

const axios = require('axios')

const getPhotos = async (req, res) => {
    const albumId = req.query.albumId
    let results;
    let isCached = false;

    try {
        const cacheResults = await redisClient.get(`photos?albumId=${albumId}`);
        if (cacheResults) {
            isCached = true;
            results = JSON.parse(cacheResults);
        } else {
            const { data } = await axios.get(
                "https://jsonplaceholder.typicode.com/photos",
                { params: { albumId } }
            )
            results = data
            redisClient.setEx(
                `photos?albumId=${albumId}`,
                process.env.DEFAULT_EXPIRATION,
                JSON.stringify(data)
            )
        }

        res.send({
            fromCache: isCached,
            data: results,
        });
    } catch (error) {
        console.log(error)
    }
}

const getPhotoById = async (req, res) => {
    const photoId = req.params.id;
    let results;
    let isCached = false;

    try {
        const cacheResults = await redisClient.get(`photos:${photoId}`);
        if (cacheResults) {
            isCached = true;
            results = JSON.parse(cacheResults);
        } else {
            const { data } = await axios.get(
                `https://jsonplaceholder.typicode.com/photos/${photoId}`
            )
            results = data
            redisClient.setEx(
                `photos:${photoId}`,
                process.env.DEFAULT_EXPIRATION,
                JSON.stringify(data)
            )
        }

        res.send({
            fromCache: isCached,
            data: results,
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getPhotos,
    getPhotoById
}