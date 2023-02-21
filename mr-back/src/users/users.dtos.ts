import { IsEmail, isNotEmpty, IsNotEmpty, isString, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}

export class UserExistsDto {
    @IsNotEmpty()
    @IsString()
    email: string;
}

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class UpdateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}

export class UsersPassUpdateDto{
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}