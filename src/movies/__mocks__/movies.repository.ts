import { movieStub } from '../test/stubs/movie.stub';

export const MovieRepository = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([movieStub()]),
  findById: jest.fn().mockResolvedValue(movieStub()),
  update: jest.fn().mockResolvedValue(movieStub()),
  delete: jest.fn(),
  create: jest.fn().mockResolvedValue(movieStub()),
});
