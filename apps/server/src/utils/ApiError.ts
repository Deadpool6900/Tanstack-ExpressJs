export class ApiError extends Error {
	statusCode: number;
	errorCode?: string;
	details?: any;

	constructor(
		statusCode: number,
		message: string,
		errorCode?: string,
		details?: any,
	) {
		super(message);
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		this.details = details;

		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this);
	}
}
