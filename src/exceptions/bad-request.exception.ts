import { HttpStatus } from 'src/shared/enums/http-status.enum';
import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
	constructor(message: string = 'Bad request') {
		super(HttpStatus.BAD_REQUEST, message);
	}
}
