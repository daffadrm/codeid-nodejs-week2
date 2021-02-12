export class BadRequestError extends Error {
  constructor(error) {
    super(error);

    this.data = { error };
    this.message= "Warning : "+error.message;
    this.statusCode = error.statusCode;
  }
}