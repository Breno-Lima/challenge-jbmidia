import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users.repository";
import { JwtProvider } from "../providers/JwtProvider/models";
import { HashProvider } from "../providers/HashProvider/models";
import type { AuthenticateUserDTO } from "../dtos/AuthenticateUser.dto";

@Injectable()
export class AuthenticateUser {
    constructor(
        private readonly jwtProviders: JwtProvider,
        private readonly usersRepository: UsersRepository,
        private readonly hashProvider: HashProvider,
    ) {}

    public async execute({
        email,
        password,
    }: AuthenticateUserDTO): Promise<string> {
        const existingUser = await this.usersRepository.findByEmail(email);
        if (!existingUser) {
            throw new HttpException(
                "Credenciais incorretas",
                HttpStatus.BAD_REQUEST,
            );
        }

        const passwordMatches = await this.hashProvider.compareHash(
            password,
            existingUser.password,
        );
        if (!passwordMatches) {
            throw new HttpException(
                "Credenciais incorretas",
                HttpStatus.BAD_REQUEST,
            );
        }

        const token = this.jwtProviders.sign({ subject: existingUser.id });

        return token;
    }
}
