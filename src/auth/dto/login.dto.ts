import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  public username: string;

  @MinLength(8)
  @MaxLength(20)
  @ApiProperty()
  public password: string;
}
