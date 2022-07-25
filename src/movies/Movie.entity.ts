import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MovieStatus } from './enums/MovieStatus.enum';

@Entity('movies')
export class MovieEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({
    type: 'enum',
    enum: [
      'Rumored',
      'Planned',
      'In_Production',
      'Post_Production',
      'Released',
      'Canceled',
    ],
    default: 'Released',
  })
  status?: MovieStatus;

  @Column({ type: 'boolean', nullable: true })
  adult?: boolean;

  @Column({ type: 'int', nullable: true })
  budget?: number;

  @Column({ type: 'float', nullable: true })
  popularity?: number;

  @Column({ type: 'date', nullable: true })
  release_date?: Date;

  @Column({ type: 'boolean', default: false })
  video?: boolean;

  @Column({ type: 'float', nullable: true })
  vote_average?: number;

  @Column({ type: 'int', default: 0 })
  vote_count?: number;
}
