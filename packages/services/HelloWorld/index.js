async function index(args) {
    const body = {
        args,
        hello: "Hello world"
    }

    return {
        headers: { 'content-type': 'text/json; charset=UTF-8' },
        body
    }
}

exports.main = index