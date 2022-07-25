const getCommonHeaders = () => {
    return {
        'content-type': 'application/json',
    }
}

const getDefaultOnEmpty = (value, _default = null) => {
    if (value === null || value === undefined) return _default
    return value
}

const makeSuccessResponse = (body) => {
    return {
        headers: getCommonHeaders(),
        status: 200,
        body
    }
}

const makeErrorResponse = (body) => {
    return {
        headers: getCommonHeaders(),
        status: 400,
        body
    }
}

module.exports = {
    getCommonHeaders,
    getDefaultOnEmpty,
    makeErrorResponse,
    makeSuccessResponse,
}