const axios = require('axios')
require('dotenv').config()

/***
 * This function is used to create a sortly item
 * @param itemName (String) Name of the item
 * @param notes (String) The text to be added
 * @param photos ({url: string}[]) List of the photo urls
 */
const createSortlyEntry = async (itemName, notes, photos) => {

    const data = {
        name: itemName,
        type: 'item',
        photos,
        notes
    }

    const axiosConfig = {
        headers: {
            "content-type": "application/json",
            accept: "application/json",
            authorization: `bearer ${process.env.SORTLY_PRIVATE_KEY}`
        }
    }

    const result = await axios.post("https://api.sortly.co/api/v1/items", data, axiosConfig)

    if(result.status === 200) return
    console.error(result)
    throw new Error("Something went wrong while creating sortly item")
}

module.exports = {
    createSortlyEntry
}