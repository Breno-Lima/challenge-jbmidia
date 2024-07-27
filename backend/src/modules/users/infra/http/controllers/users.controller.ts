import type { CreateUserDTO } from "@modules/users/dtos/CreateUser.dto";
import { CreateUser } from "@modules/users/services/CreateUser.service";
import { Body, Controller, Post } from "@nestjs/common";
import type { User } from "@prisma/client";

@Controller("users")
export class UsersController {
    constructor(private readonly createUser: CreateUser) {}
    @Post()
    public async postUsers(@Body() body: CreateUserDTO): Promise<User> {
        const user = await this.createUser.execute(body);
        return user;
    }
}
