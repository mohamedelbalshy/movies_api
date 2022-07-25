import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserEntity } from '../auth/User.entity';
import { CreateMovieDto } from './dtos/createMovie.dto';
import { RateMovieDto } from './dtos/rateMovie.dto';
import { UpdateMovieDto } from './dtos/updateMovie.dto';
import { MovieEntity } from './Movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
@UseGuards(JwtAuthGuard)
@ApiTags('Movies')
@ApiBearerAuth()
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}
  @Get()
  @ApiResponse({
    status: 200,
    description: 'List Movies Success Response',
    isArray: true,
    schema: { example: { title: 'spider man', description: 'string' } },
  })
  listMovies(): Promise<MovieEntity[]> {
    return this.movieService.findAll();
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get Movie by ID Success Response',
    schema: { example: { title: 'spider man', description: 'string' } },
  })
  getById(@Param('id', ParseIntPipe) id: number): Promise<MovieEntity> {
    return this.movieService.getById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create Movie Success Response',
    schema: { example: { title: 'spider man', description: 'string' } },
  })
  create(@Body() createMovieDto: CreateMovieDto): Promise<MovieEntity> {
    return this.movieService.create(createMovieDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.delete(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update Movie Success Response',
    schema: { example: { title: 'spider man', description: 'string' } },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<MovieEntity> {
    return this.movieService.update(id, updateMovieDto);
  }

  @Post(':id/rate')
  @ApiResponse({
    status: 201,
    description: 'Rate Movie Success Response',
    schema: { example: { title: 'spider man', description: 'string' } },
  })
  rate(
    @Param('id', ParseIntPipe) id: number,
    @Body() rateMovieDto: RateMovieDto,
    @GetUser() user: UserEntity,
  ): Promise<MovieEntity> {
    return this.movieService.rate(id, user.id, rateMovieDto);
  }
}
