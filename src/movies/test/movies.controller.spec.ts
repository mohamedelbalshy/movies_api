import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../movies.controller';
import { MoviesService } from '../movies.service';
import { movieStub } from './stubs/movie.stub';

jest.mock('../movies.service.ts');

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all movies', async () => {
      expect(await controller.listMovies()).toEqual([movieStub()]);
    });

    it('should call userService', async () => {
      await controller.listMovies();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should return movie by id', async () => {
      expect(await controller.getById(movieStub().id)).toEqual(movieStub());
    });

    it('should call userService', async () => {
      await controller.listMovies();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return updated movie', async () => {
      expect(await controller.update(movieStub().id, movieStub())).toEqual(
        movieStub(),
      );
    });

    it('should call userService', async () => {
      await controller.update(movieStub().id, movieStub());
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });
});
