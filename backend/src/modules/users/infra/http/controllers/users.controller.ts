import { AuthenticateUser } from "./../../../services/AuthenticateUser.service";
import { Response } from "express";
import { AuthenticateUserDTO } from "@modules/users/dtos/AuthenticateUser.dto";
import { CreateUserDTO } from "@modules/users/dtos/CreateUser.dto";
import { CreateUser } from "@modules/users/services/CreateUser.service";
import { Body, Controller, Post, Res } from "@nestjs/common";
import type { User } from "@prisma/client";

@Controller("users")
export class UsersController {
    constructor(
        private readonly createUser: CreateUser,
        private readonly authenticateUser: AuthenticateUser,
    ) {}
    @Post()
    public async postUsers(@Body() body: CreateUserDTO): Promise<User> {
        const user = await this.createUser.execute(body);
        return user;
    }

    @Post("login")
    public async loginUsers(
        @Body() body: AuthenticateUserDTO,
        @Res({ passthrough: true }) res: Response,
    ): Promise<void> {
        const jwt = await this.authenticateUser.execute(body);

        res.cookie("Authorization", `Bearer ${jwt}`, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
    }
}
