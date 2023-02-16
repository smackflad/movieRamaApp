import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto, MovieReactionDto } from 'src/movies/movies.dtos';
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

    async movieReact(id: number, MovieReactionDto: MovieReactionDto){
        const movie = await this.movieRepository.findOne({where: {id: id}});
        const likes = movie.likes;
        const hates = movie.hates;

        if(MovieReactionDto.reaction === 1){
            if(!(likes.includes(MovieReactionDto.user))){
                likes.push(MovieReactionDto.user);
                if((hates.includes(MovieReactionDto.user))){
                    hates.splice(hates.indexOf(MovieReactionDto.user), 1);
                }
            }else{
                likes.splice(likes.indexOf(MovieReactionDto.user), 1);
            }
        }else if(MovieReactionDto.reaction === 2){
            if(!(hates.includes(MovieReactionDto.user))){
                hates.push(MovieReactionDto.user);
                if((likes.includes(MovieReactionDto.user))){
                    likes.splice(likes.indexOf(MovieReactionDto.user), 1);
                }
            }else{
                hates.splice(hates.indexOf(MovieReactionDto.user), 1);
            }
        }
        
        return this.movieRepository.save({...movie, likes, hates});
    }
}
