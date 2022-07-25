const helpers = require('./helpers')
const axios = require('axios')
const {createSortlyEntry} = require("./sortly.helpers");
const PHOTOS_LABEL = "photos"

async function index(args) {
    try {
        const data = helpers.getDefaultOnEmpty(args.data)
        if (!data || !data.fields) {
            return helpers.makeSuccessResponse({
                message: "No data or data.field arguments found"
            })
        }

        const dataList = data.fields
            .map(item => {
                const label = helpers.getDefaultOnEmpty(item.label)
                if (!label && item.type !== "FILE_UPLOAD") return undefined
                return {
                    label: label || PHOTOS_LABEL,
                    value: helpers.getDefaultOnEmpty(item.value, 'no value')
                }
            })
            .filter(item => Boolean(item))

        const photos = Object.assign([], ...dataList.filter(item => item.label === PHOTOS_LABEL).map(item => item.value))
            .map(item => ({url: item.url}))


        console.log({dataList, data: JSON.stringify(data), photos})

        await createSortlyEntry(
            data.createdAt || "Entry",
            JSON.stringify(dataList.filter(item => item !== PHOTOS_LABEL), null, 2),
            photos
        )

        return helpers.makeErrorResponse({
            message: "Success"
        })
    }
    catch (e) {
        console.error(e)
        return helpers.makeErrorResponse({
            message: e.message
        })
    }
}

exports.main = index