import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from './Rating.entity';
import { RatingsController } from './ratings.controller';
import { RatingRepository } from './ratings.repository';
import { RatingsService } from './ratings.service';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity])],
  controllers: [RatingsController],
  providers: [RatingsService, RatingRepository],
  exports: [RatingRepository]
})
export class RatingsModule {}
