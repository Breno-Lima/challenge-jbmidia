import type { User } from "@prisma/client";
import type { CreateUserDTO } from "../dtos/CreateUser.dto";

export abstract class UsersRepository {
    abstract create(data: CreateUserDTO): Promise<User>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findByUsername(username: string): Promise<User | null>;
}
