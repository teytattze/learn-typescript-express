import { HttpStatus } from '../shared/enums/http-status.enum';
import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
	constructor(message: string = 'Not found') {
		super(HttpStatus.NOT_FOUND, message);
	}
}
