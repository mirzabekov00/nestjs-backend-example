import { ApiProperty } from "@nestjs/swagger";
import { Length, IsString, IsEmail } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "eldar@gmail.com", description: "user e-mail" })
  @IsString({ message: "must be a string" })
  @IsEmail({}, { message: "must be an email" })
  readonly email: string;

  @ApiProperty({ example: "test777", description: "user password" })
  @IsString({ message: "must be a string" })
  @Length(4, 16, { message: "length must be between 4 and 16" })
  readonly password: string;
}
