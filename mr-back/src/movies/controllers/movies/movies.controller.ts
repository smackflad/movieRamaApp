import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/movies.dtos';
import { MoviesService } from 'src/movies/services/movies/movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService: MoviesService) {}

    @Get()
    getMovies(){
        // return "this.movieService.getMovies()";
        return this.movieService.getMovies();
    }

    @Get('author/:id')
    getMoviesByAuthor(@Param('id', ParseIntPipe) id: number){
        // return "this.movieService.findMoviesByAuthor(id)";
        return this.movieService.findMoviesByAuthor(id);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createMovie(@Body() CreateMovieDto: CreateMovieDto) {
        // return "this.movieService.createMovie(CreateMovieDto)";
        return this.movieService.createMovie(CreateMovieDto);
    }
}
