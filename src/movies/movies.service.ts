import { Injectable } from '@nestjs/common';
import { RatingRepository } from '../ratings/ratings.repository';
import { CreateMovieDto } from './dtos/createMovie.dto';
import { RateMovieDto } from './dtos/rateMovie.dto';
import { UpdateMovieDto } from './dtos/updateMovie.dto';
import { MovieEntity } from './Movie.entity';
import { MovieRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly ratingRepository: RatingRepository,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    const movies = await this.movieRepository.findAll();

    return movies;
  }

  async getById(id: number): Promise<MovieEntity> {
    return await this.movieRepository.findById(id);
  }

  async create(createMovieDto: CreateMovieDto): Promise<MovieEntity> {
    const movie = await this.movieRepository.create(createMovieDto);

    return movie;
  }

  async delete(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
  async update(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<MovieEntity> {
    return this.movieRepository.update(id, updateMovieDto);
  }

  async rate(
    id: number,
    userId: number,
    rateMovieDto: RateMovieDto,
  ): Promise<any> {
    await this.getById(id);

    const result = await this.ratingRepository.upsert(userId, id, rateMovieDto);
    if (result.raw) {
      return { message: 'Rating has been updated!' };
    }
    return { message: 'something went wrong' };
  }
}
