export class HttpException extends Error {
	status: number;
	message: string;
	errorCode: string;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
		this.message = message;
	}
}
