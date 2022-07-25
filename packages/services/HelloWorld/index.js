const helpers = require('./helpers')

async function index(args) {
    try {
        const data = helpers.getDefaultOnEmpty(args.data)
        if (!data || !data.fields) {
            return {
                headers: helpers.getCommonHeaders(),
                status: 200,
                body: {
                    message: "No data argument found"
                }
            }
        }

        const dataList = data.fields
            .map(item => {
                const label = helpers.getDefaultOnEmpty(item.label)
                if (!label) return undefined
                return {
                    label,
                    value: helpers.getDefaultOnEmpty(item.value, 'no value')
                }
            })
            .filter(item => Boolean(item))

        console.log({dataList})

        return {
            headers: helpers.getCommonHeaders(),
            status: 200,
            body: {
                message: "Success",
                dataList,
                args,
            }
        }

    }
    catch (e) {
        console.error(e)
        return {
            headers: helpers.getCommonHeaders(),
            status: 400,
            body: {
                error: e.message
            }
        }
    }
}

exports.main = index