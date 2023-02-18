import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMovieDto, MovieReactionDto } from 'src/movies/movies.dtos';
import { MoviesService } from 'src/movies/services/movies/movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService: MoviesService) {}

    
    @UseGuards(AuthGuard('jwt'))
    @Get('/:by/:order/:m')
    getMoviesUser(@Request() req, @Param('by', ParseIntPipe) by: number, @Param('order', ParseIntPipe) order: number, @Param('m', ParseIntPipe) m: number){
        // return "this.movieService.getMovies()";
        if(m){
            return this.movieService.getMoviesUser(by, order, req.user, m);
        }else{
            return this.movieService.getMovies(by, order);
        }
    }

    @Get('/:by/:order')
    getMovies(@Param('by', ParseIntPipe) by: number, @Param('order', ParseIntPipe) order: number){
        // return "this.movieService.getMovies()";
        return this.movieService.getMovies(by, order);
    }
    
    @Get('author/:id')
    getMoviesByAuthor(@Param('id', ParseIntPipe) id: number){
        // return "this.movieService.findMoviesByAuthor(id)";
        return this.movieService.findMoviesByAuthor(id);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Patch('react/:id')
    movieReact(@Request() req, @Param('id') id, @Body() MovieReactionDto: MovieReactionDto) {
        // console.log(req.user.id)
        return this.movieService.movieReact(id, MovieReactionDto, <number>req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    // @UsePipes(ValidationPipe)
    createMovie(@Request() req, @Body() CreateMovieDto: CreateMovieDto) {
        return this.movieService.createMovie(req.user.id, CreateMovieDto);
    }
}
