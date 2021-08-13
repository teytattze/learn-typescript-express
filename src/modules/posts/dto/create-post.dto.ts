import { IsString } from 'class-validator';

export class CreatePostDto {
	@IsString()
	author: string;

	@IsString()
	title: string;

	@IsString()
	content: string;
}
