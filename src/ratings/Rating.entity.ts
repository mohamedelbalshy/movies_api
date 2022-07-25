import { UserEntity } from '../auth/User.entity';
import { MovieEntity } from '../movies/Movie.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('movies_ratings')
@Unique('ratings_unique_constraint', ['movie_id', 'user_id'])
export class RatingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', nullable: false })
  rating!: number;

  @Column()
  user_id: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  movie_id: number;

  @ManyToOne(() => MovieEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;
}
