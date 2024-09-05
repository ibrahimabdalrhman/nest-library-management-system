import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ description: 'The username of the user' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  readonly password: string;
}
