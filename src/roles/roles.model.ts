import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttributes {
  value: string;
  description: string;
}

@Table({ tableName: "roles" })
export class Role extends Model<Role, RoleCreationAttributes> {
  @ApiProperty({ example: 1, description: "unique, primary role id" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "ADMIN", description: "role value" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @ApiProperty({
    example: "this is admin role",
    description: "description of the role",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
