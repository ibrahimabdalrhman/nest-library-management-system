import { IsString, IsEmail, IsArray, ArrayNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  readonly _id: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsArray()
  @ArrayNotEmpty()
  readonly roles: string[];

  @IsOptional() // This property is not present in the sample JSON, so it's optional
  readonly __v?: number;
}
