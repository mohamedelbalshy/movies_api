import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RateMovieDto } from '../movies/dtos/rateMovie.dto';
import { InsertResult, Repository } from 'typeorm';
import { RatingEntity } from './Rating.entity';

@Injectable()
export class RatingRepository {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
  ) {}

  async upsert(
    user_id: number,
    movie_id: number,
    rateMovieDto: RateMovieDto,
  ): Promise<InsertResult> {
    try {
      const result = await this.ratingRepository.upsert(
        { movie_id, user_id, rating: rateMovieDto.rate },
        { conflictPaths: ['movie_id', 'user_id'] },
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
