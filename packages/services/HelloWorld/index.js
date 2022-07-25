const helpers = require('./helpers')
let http = undefined
try {
    https = require('node:https');
} catch (err) {
    console.warning('https support is disabled!');
}

async function index(args) {
    try {
        if (!http) {
            return helpers.makeErrorResponse({
                message: "Cannot make requests to sortly. Http disabled. Aborting service."
            })
        }

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
                    label: label || "File",
                    value: helpers.getDefaultOnEmpty(item.value, 'no value')
                }
            })
            .filter(item => Boolean(item))

        console.log({dataList, data: JSON.stringify(data)})

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