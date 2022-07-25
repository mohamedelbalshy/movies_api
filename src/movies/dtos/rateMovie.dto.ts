import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RateMovieDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  rate: number;
}
