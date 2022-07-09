async function index(args) {
    const body = {
        args,
        hello: "Hello world"
    }

    return {
        headers: { 'content-type': 'application/json' },
        body
    }
}

exports.main = index