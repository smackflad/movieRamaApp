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

    findMoviesByAuthor(id: number){
        return this.movieRepository.find({where: {author: id}});
    }

    async movieReact(id: number, MovieReactionDto: MovieReactionDto, usrId: number){
        const movie = await this.movieRepository.findOne({where: {id: id}});
        const likes = movie.likes;
        const hates = movie.hates;
        // console.log(movie.likes.includes(usrId))
        
        // movie.likes.push(usrId);
        // console.log(usrId)

        // if (!likes.includes(usrId)) {
        // }
        console.log(movie.likes)

        // if(MovieReactionDto.reaction === 1){
        //     if(!(likes.includes(usrId))){
        //         likes.push(usrId);
        //         if((hates.includes(usrId))){
        //             hates.splice(hates.indexOf(usrId), 1);
        //         }
        //     }else{
        //         likes.splice(likes.indexOf(usrId), 1);
        //     }
        // }else if(MovieReactionDto.reaction === 2){
        //     if(!(hates.includes(usrId))){
        //         hates.push(usrId);
        //         if((likes.includes(usrId))){
        //             likes.splice(likes.indexOf(usrId), 1);
        //         }
        //     }else{
        //         hates.splice(hates.indexOf(usrId), 1);
        //     }
        // }
        
        // return this.movieRepository.save({...movie, likes, hates});
        return this.movieRepository.save(movie);
    }
}
