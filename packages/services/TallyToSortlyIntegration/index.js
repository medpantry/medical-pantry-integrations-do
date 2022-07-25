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

        const getValueFromDataList = (dataList, label, _default = "no value") => getDefaultOnEmpty(
            getDefaultOnEmpty(dataList.filter(item => item.label === label)[0], {}).value,
            _default
        )

        const sortlyNotes = [
            `Total number of boxes: ${getValueFromDataList(dataList, "Total number of boxes")}`,
            `Total number of bags: ${getValueFromDataList(dataList, "Total number of bags")}`,
            `Any miscellaneous or big items (please list): ${getValueFromDataList(dataList, "Any miscellaneous or big items (please list)")}`,
            `Name: ${getValueFromDataList(dataList, "Your name")}`,
            `Organisation: ${getValueFromDataList(dataList, "Your organisation")}`,
            `Phone number: ${getValueFromDataList(dataList, 'Your phone number')}`,
            `Email: ${getValueFromDataList(dataList, "Your email")}`,
        ].join("\n")

        await createSortlyEntry(
            `${getValueFromDataList(dataList, "Your organisation", "No organisation given")}@${moment(data.createdAt || "").format("YYYYMMDD_hh:mm:ss")}` || "Entry",
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