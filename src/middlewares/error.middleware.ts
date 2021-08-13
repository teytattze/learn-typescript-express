import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../shared/enums/http-status.enum';
import { HttpException } from '../exceptions/http.exception';

export const errorMiddleware = (
	error: HttpException,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
	const message = error.message || 'Internal server error';

	res.status(status).send({ status, message });
};
