import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies/movies.controller';
import { MoviesService } from './services/movies/movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Movie]),],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
