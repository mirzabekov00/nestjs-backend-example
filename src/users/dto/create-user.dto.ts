import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "eldar@gmail.com", description: "user e-mail" })
  readonly email: string;

  @ApiProperty({ example: "test777", description: "user password" })
  readonly password: string;
}
