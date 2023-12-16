class ResponseError extends Error {
    status: number = 400;

    constructor(status: number, message: string) {
        super(message);
        Object.setPrototypeOf(this, ResponseError.prototype);
        this.status = status;
    }

}

export { ResponseError }