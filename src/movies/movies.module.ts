import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from 'src/ratings/Rating.entity';
import { RatingsModule } from 'src/ratings/ratings.module';
import { RatingRepository } from 'src/ratings/ratings.repository';
import { MovieEntity } from './Movie.entity';
import { MoviesController } from './movies.controller';
import { MovieRepository } from './movies.repository';
import { MoviesService } from './movies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, RatingEntity]),
    RatingsModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MovieRepository, RatingRepository],
})
export class MoviesModule {}
