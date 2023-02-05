import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from 'src/movies/movies.dtos';
import { Movie } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>,
    ){}

    createMovie(CreateMovieDto: CreateMovieDto){
        const newMovie = this.movieRepository.create(CreateMovieDto);
        return this.movieRepository.save(newMovie);
    }

    getMovies(){
        return this.movieRepository.find();
    }

    findMoviesByAuthor(id: number){
        return this.movieRepository.find({where: {author: id}});
    }
}
