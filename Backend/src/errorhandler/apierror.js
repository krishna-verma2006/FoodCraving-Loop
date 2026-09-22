class apierror extends Error{
    constructor(
        statusCode,
        message="something went wrong",
        error=[],
        stack=[],
    ){
         statusCode=this.statusCode,
         message=this.message,
         error=this.error,
         this.stack=stack
    }
}

export {apierror};