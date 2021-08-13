import * as bcrypt from 'bcryptjs';
import * as express from 'express';
import { BadRequestException } from '../../exceptions/bad-request.exception';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';
import { ValidationMiddleware } from '../../middlewares/validation.middleware';
import { BaseController } from '../../shared/base/controller.base';
import { CreateUserDto } from '../users/dto';
import { userModel } from '../users/users.model';
import { SALT } from './authentication.const';
import { LoginDto } from './dto';

export class AuthenticationController extends BaseController {
	private user = userModel;

	constructor() {
		super('/auth');
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			`${this.path}/register`,
			ValidationMiddleware(CreateUserDto),
			this.registration,
		);
		this.router.post(`${this.path}/login`, ValidationMiddleware(LoginDto), this.login);
	}

	private async registration(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) {
		const userData: CreateUserDto = req.body;
		const isSameEmail = await this.user.findOne({ email: userData.email });
		if (isSameEmail) {
			next(new BadRequestException('This email has already taken'));
		}
		const hashedPassword = await bcrypt.hash(userData.password, SALT);
		const user = await this.user.create({
			...userData,
			password: hashedPassword,
		});
		delete user.password;
		res.send(user);
	}

	private async login(req: express.Request, res: express.Response, next: express.NextFunction) {
		const loginData: LoginDto = req.body;
		const user = await this.user.findOne({ email: loginData.email });
		if (!user) {
			next(new UnauthorizedException());
		}
		const isPasswordMatched = await bcrypt.compare(loginData.password, user.password);
		if (!isPasswordMatched) {
			next(new UnauthorizedException());
		}
		delete user.password;
		res.send(user);
	}
}
