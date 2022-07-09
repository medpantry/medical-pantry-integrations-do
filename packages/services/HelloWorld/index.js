async function index(args) {
    const body = {
        args,
        hello: "Hello world"
    }

    console.log({type: "test log", body: JSON.stringify(body)})

    return {
        headers: { 'content-type': 'application/json' },
        body
    }
}

exports.main = index