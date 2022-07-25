import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './User.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  public async signUp(loginDto: LoginDto): Promise<UserEntity> {
    const { username, password } = loginDto;

    const salt = await bcrypt.genSalt();
    const user = new UserEntity();
    user.username = username;

    user.password = await this.hashPassword(password, salt);

    try {
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      if ((error.code = '23505')) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private async validatePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  async signIn(loginDto: LoginDto): Promise<UserEntity> {
    const { username, password } = loginDto;

    const userFound = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (userFound) {
      const validPassword = await this.validatePassword(
        password,
        userFound.password,
      );

      if (validPassword) {
        return userFound;
      } else {
        throw new UnauthorizedException('invalid credentials');
      }
    } else {
      throw new NotFoundException();
    }
  }

  async findOne(
    findOptions?: FindOptionsWhere<UserEntity>,
    select?:
      | FindOptionsSelect<UserEntity>
      | FindOptionsSelectByString<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: findOptions,
      select,
    });

    return user;
  }
}
