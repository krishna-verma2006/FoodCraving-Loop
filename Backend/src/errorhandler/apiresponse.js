class apiresponse extends Error{
    constructor(
        statusCode,
        message=[],
        error=[],
        stack=[],
    )
    {
        statusCode=this.statusCode,
        message=this.message,
        error=this.error,
        stack=this.stack
    }
}

export {apiresponse};