import type { User } from "@prisma/client";
import type { CreateUserDTO } from "../dtos/CreateUser.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users.repository";
import { HashProvider } from "../providers/HashProvider";

@Injectable()
export class CreateUser {
    constructor(
        private readonly hashProvider: HashProvider,
        private readonly usersRepository: UsersRepository,
    ) {}

    public async execute({
        email,
        password,
        username,
    }: CreateUserDTO): Promise<User> {
        const existingEmail = await this.usersRepository.findByEmail(email);
        if (existingEmail) {
            throw new HttpException(
                "Um usuário com este email já existe",
                HttpStatus.CONFLICT,
            );
        }

        const existingUsername =
            await this.usersRepository.findByUsername(username);
        if (existingUsername) {
            throw new HttpException(
                "Este usuário já existe",
                HttpStatus.CONFLICT,
            );
        }

        const passwordHash = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            username,
            email,
            password: passwordHash,
        });

        return user;
    }
}
