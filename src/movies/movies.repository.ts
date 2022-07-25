import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from './Movie.entity';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  public async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({ where: {} });
  }

  public async findById(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) throw new NotFoundException(`Movie with id: ${id} not found.`);

    return movie;
  }

  public async update(id: number, updateDto: any): Promise<MovieEntity> {
    const movie = await this.findById(id);
    return this.movieRepository.save({ ...movie, ...updateDto });
  }

  public async delete(id: number): Promise<void> {
    const movie = await this.findById(id);
    await this.movieRepository.delete(movie.id);
  }

  public async create(createDto): Promise<MovieEntity> {
    const movie = await this.movieRepository.save(createDto);
    return movie;
  }
}
