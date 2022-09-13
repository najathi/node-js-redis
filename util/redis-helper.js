const axios = require('axios')
const redis = require('redis')

let redisClient
(async () => {
    redisClient = redis.createClient()
    redisClient.on("error", (error) => console.error(`Error : ${error}`))
    await redisClient.connect()
})()

async function getOrSetCache(key, url, config) {
    let results;
    let isCached = false;

    return new Promise(async (resolve, reject) => {
        try {
            const cacheResults = await redisClient.get(key)
            if (cacheResults) {
                isCached = true;
                results = JSON.parse(cacheResults);
            } else {
                const { data } = await axios.get(url, config)
                results = data
                redisClient.setEx(
                    key,
                    process.env.DEFAULT_EXPIRATION,
                    JSON.stringify(data)
                )
            }

            resolve({
                fromCache: isCached,
                data: results,
            });
        }
        catch (error) {
            if (error.response) {
                reject(error.response.data);
            } else if (error.request) {
                reject(error);
            } else {
                reject(error);
            }
        }
    })
}

module.exports = {
    redisClient,
    getOrSetCache
}