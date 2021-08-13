import { IsString, IsEmail, IsOptional, ValidateNested } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class CreateUserDto {
	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsEmail()
	email: string;

	@IsString()
	password: string;

	@IsOptional()
	@ValidateNested()
	address: CreateAddressDto;
}
