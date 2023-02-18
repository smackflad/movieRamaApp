import { isNotEmpty, IsNotEmpty, isString, IsString, MinLength } from "class-validator";

export class CreateMovieDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}

export class MovieReactionDto {
    @IsNotEmpty()
    reaction: number;
}