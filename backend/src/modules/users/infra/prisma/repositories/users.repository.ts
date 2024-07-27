/* eslint-disable prettier/prettier */
import type { User } from "@prisma/client";
import { PrismaService } from "@database/prisma.service";
import type { CreateUserDTO } from "@modules/users/dtos/CreateUser.dto";
import { UsersRepository } from "@modules/users/repositories/users.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(private readonly prisma: PrismaService) { }

    public async create(data: CreateUserDTO): Promise<User> {
        const user = await this.prisma.user.create({
            data,
        });

        return user;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    public async findByUsername(username: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                username,
            },
        });

        return user;
    }
}
