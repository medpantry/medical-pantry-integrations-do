const helpers = require('./helpers')
const {createSortlyEntry} = require("./sortly.helpers");
const moment = require('moment')
const {getDefaultOnEmpty} = require("./helpers");
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

        const getValueFromDataList = (dataList, label) => getDefaultOnEmpty(
            getDefaultOnEmpty(dataList.filter(item => item.label === label)[0], {}).value,
            'no value'
        )
        const sortlyNotes = `
            Total number of boxes: ${getValueFromDataList(dataList, "Total number of boxes")},
            Total number of bags: ${getValueFromDataList(dataList, "Total number of boxes")},
            Any miscellaneous or big items (please list): ${getValueFromDataList(dataList, "Any miscellaneous or big items (please list)")},
        `

        await createSortlyEntry(
            moment(data.createdAt || "").format("YYYYMMDD") || "Entry",
            sortlyNotes,
            photos
        )

        console.log({dataList, sortlyNotes, photos})
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