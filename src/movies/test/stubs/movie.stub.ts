import { MovieStatus } from '../../../movies/enums/MovieStatus.enum';
import { MovieEntity } from '../../../movies/Movie.entity';

export const movieStub = () => {
  return {
    title: 'test',
    id: 1,
    status: MovieStatus.RELEASED,
  } as MovieEntity;
};
