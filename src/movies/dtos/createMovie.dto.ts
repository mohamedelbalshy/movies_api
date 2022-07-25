import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { MovieStatus } from '../enums/MovieStatus.enum';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title!: string;

  @IsEnum(MovieStatus)
  @IsOptional()
  @ApiProperty({ required: false })
  status?: MovieStatus;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  adult?: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  budget?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  popularity?: number;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  release_date?: Date;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  video?: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  vote_average?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  vote_count?: number;
}
