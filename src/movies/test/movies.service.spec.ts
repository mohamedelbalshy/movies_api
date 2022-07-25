import { Test, TestingModule } from '@nestjs/testing';
import { RatingRepository } from '../../ratings/ratings.repository';
import { MovieRepository } from '../movies.repository';
import { MoviesService } from '../movies.service';
import { movieStub } from './stubs/movie.stub';

jest.mock('../movies.repository.ts');
jest.mock('../../ratings/ratings.repository.ts');
describe('MoviesService', () => {
  let service: MoviesService;
  let movieRepo: MovieRepository;
  let ratingRepository: RatingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [MoviesService, MovieRepository, RatingRepository],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieRepo = module.get<MovieRepository>(MovieRepository);
    ratingRepository = module.get<RatingRepository>(RatingRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should call Movies Repo', async () => {
      await service.findAll();

      expect(movieRepo.findAll).toBeCalledTimes(1);
    });

    it('should return all movies', async () => {
      expect(await service.findAll()).toEqual([movieStub()]);
    });
  });

  describe('update', () => {
    it('should call movies repo update function', async () => {
      await service.update(movieStub().id, movieStub());
      expect(movieRepo.update).toBeCalledTimes(1);
    });

    it('should return updated movie', async () => {
      expect(await service.update(movieStub().id, movieStub())).toEqual(
        movieStub(),
      );
    });
  });

  describe('create', () => {
    it('should call create function in movies repo ', async () => {
      await service.create(movieStub());
      expect(movieRepo.create).toHaveBeenCalledTimes(1);
    });

    it('should return created movie', async () => {
      expect(await service.create(movieStub())).toEqual(movieStub());
    });
  });

  describe('rate movie', () => {
    it('should call rate function in ratings repo', async () => {
      await service.rate(movieStub().id, 1, { rate: 10 });
      expect(ratingRepository.upsert).toHaveBeenCalledTimes(1);
    });

    it('should return result of rate movie', async () => {
      expect(await service.rate(movieStub().id, 1, { rate: 10 })).toEqual({
        message: 'Rating has been updated!',
      });
    });
  });
});
