import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users.model";

interface PostCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: "posts" })
export class Post extends Model<Post, PostCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @BelongsTo(() => User)
  author: User;
}
