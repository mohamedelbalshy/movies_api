import { movieStub } from '../test/stubs/movie.stub';

export const MoviesService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([movieStub()]),
  getById: jest.fn().mockResolvedValue(movieStub()),
  create: jest.fn().mockResolvedValue(movieStub()),
  delete: jest.fn(),
  update: jest.fn().mockResolvedValue(movieStub()),
  rate: jest.fn().mockResolvedValue({ message: 'Rating has been updated!' }),
});
