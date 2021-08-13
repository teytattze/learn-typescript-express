import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { HttpException } from 'src/exceptions/http.exception';
import { HttpStatus } from 'src/shared/enums/http-status.enum';

export const ValidationMiddleware = (type: any, skipMissingProperties = false): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const errors: ValidationError[] = await validate(plainToClass(type, req.body), {
			skipMissingProperties,
		});
		if (errors.length > 0) {
			const message = errors
				.map((error: ValidationError) => Object.values(error.constraints))
				.join(', ');
			next(new HttpException(HttpStatus.BAD_REQUEST, message));
		}
		next();
	};
};
