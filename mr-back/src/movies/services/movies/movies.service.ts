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

    createMovie(id: number, CreateMovieDto: CreateMovieDto){
        const newMovie = this.movieRepository.create({...CreateMovieDto, author: id});
        return this.movieRepository.save(newMovie);
    }

    getMovies(by: number, order: number){
        var temp: FindOptionsOrderValue = order ? "ASC" : "DESC";
        if(by === 0){
            return this.movieRepository.find({order: {datePosted: temp}});
        }else if(by === 1){
            return this.movieRepository.createQueryBuilder("movie")
            .leftJoinAndSelect("movie.likes", "user")
            .orderBy("ARRAY_LENGTH(movie.likes)", temp)
            .getMany();
        }else{
            return this.movieRepository.createQueryBuilder("movie")
            .leftJoinAndSelect("movie.hates", "user")
            .orderBy("ARRAY_LENGTH(movie.hates)", temp)
            .getMany();
        }
    }

    getMoviesUser(by: number, order: number, user: User, m: number){
        console.log(user)
        var temp: FindOptionsOrderValue = order ? "ASC" : "DESC";
        var query = this.movieRepository.createQueryBuilder("movie")
        // .leftJoinAndSelect("", "movie.likes", "movie.hates", "user");
        
        if(m === 1){
            //posts by user
            query.where("movie.author = :userId", { userId: user.id })
        }else if(m === 2){
            //return posts created from last login
            // tempp = {author: user.id};
        }
        
        if(by === 0){
            // tempOrd ={datePosted: temp}
            query.orderBy("datePosted", temp)
        }else if(by === 1){
            // tempOrd ={likes: temp}
            query.orderBy("ARRAY_LENGTH(movie.likes)", temp)
        }else{
            // tempOrd ={hates: temp};
            query.orderBy("ARRAY_LENGTH(movie.hates)", temp)
        }
        // return this.movieRepository.find({where: tempp, order: tempOrd});
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
