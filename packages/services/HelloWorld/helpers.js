module.exports = {
    getCommonHeaders: () => {
        return {
            'content-type': 'application/json',
        }
    },
    getDefaultOnEmpty: (value, _default = null) => {
        if (value === null || value === undefined) return _default
        return value
    }
}