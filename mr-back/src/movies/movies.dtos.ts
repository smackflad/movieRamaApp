import { isNotEmpty, IsNotEmpty, isString, IsString, MinLength } from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    author: number;
}

export class MovieReactionDto {
    @IsNotEmpty()
    user: number;

    @IsNotEmpty()
    reaction: number;
}