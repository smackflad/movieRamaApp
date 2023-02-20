import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto, MovieReactionDto } from 'src/movies/movies.dtos';
import { Movie, User } from 'src/typeorm';
import { FindManyOptions, FindOptionsOrder, FindOptionsOrderValue, FindOptionsWhere, FindOptionsWhereProperty, Repository } from 'typeorm';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>,
    ){}

    createMovie(usr: User, CreateMovieDto: CreateMovieDto){//TODO create returns movie and all of author except password, make it so it returns only author's name.
        const newMovie = this.movieRepository.create({...CreateMovieDto, author: usr});
        return this.movieRepository.save(newMovie);
    }

    async getMovies(by: number, order: number){
        var temp: FindOptionsOrderValue = order ? "ASC" : "DESC";

        let query = this.movieRepository.createQueryBuilder("movie")
        .leftJoinAndSelect("movie.author", "user")
        .select(['user.firstName', 'user.lastName', 'movie'])
        .andWhere('movie.author = user.id');

        if(by === 0){
            query.orderBy("movie.datePosted", temp)
        }else if(by === 1){
            query.orderBy("movie.likes", temp)
        }else{
            query.orderBy("movie.hates", temp)
        }
        return query.getMany();
    }

    getMoviesUser(by: number, order: number, user: User, m: number){
        var temp: FindOptionsOrderValue = order ? "ASC" : "DESC";
        var query = this.movieRepository.createQueryBuilder("movie")
        .leftJoinAndSelect("movie.author", "user")
        .select(['user.firstName', 'user.lastName', 'movie'])
        
        if(m === 1){
            //posts by user
            query.where("movie.author = :userId", { userId: user.id })
        }else if(m === 2){
            //TODO: return posts created from last login
            // tempp = {author: user.id};
        }
        
        query.andWhere('movie.author = user.id');
        
        if(by === 0){
            query.orderBy("movie.datePosted", temp)
        }else if(by === 1){
            query.orderBy("movie.likes", temp)
        }else{
            query.orderBy("movie.hates", temp)
        }
        return query.getMany();
    }

    async movieReact(id: number, MovieReactionDto: MovieReactionDto, usr: User){
        const movie = await this.movieRepository.findOne(
            {where: {id: id}}
        );

        if(MovieReactionDto.reaction === 1){
            let tempL = movie.likes.findIndex((likedUser) => likedUser == usr.id);
            if(tempL === -1){
                movie.likes.push(usr.id);
                let temp = movie.hates.findIndex((hatedUser) => hatedUser == usr.id);
                if(temp !== -1){
                    movie.hates.splice(temp, 1);
                }
            }else{
                movie.likes.splice(tempL, 1);
            }
        }else if(MovieReactionDto.reaction === 2){
            let tempH = movie.hates.findIndex((hatedUser) => hatedUser == usr.id);
            if(tempH === -1){
                movie.hates.push(usr.id);
                let temp = movie.likes.findIndex((likedUser) => likedUser == usr.id);
                if(temp !== -1){
                    movie.likes.splice(temp, 1);
                }
            }else{
                movie.hates.splice(tempH, 1);
            }
        }
        
        return this.movieRepository.save(movie);
    }
}
