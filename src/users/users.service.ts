import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("user");
    if (role) {
      await user.$set("roles", [role.id]);
      user.roles = [role];
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({
      include: { all: true },
    });
    return users;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user;
  }

  async addRole(roleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(roleDto.userId);
    const role = await this.roleService.getRoleByValue(roleDto.value);

    if (role && user) {
      await user.$add("role", role.id);
      return roleDto;
    }

    throw new HttpException("role or user not found", HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND);
    }

    user.banReason = dto.banReason;
    user.banned = true;
    await user.save();
    return user;
  }
}
