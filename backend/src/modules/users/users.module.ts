/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UsersController } from "./infra/http/controllers/users.controller";
import { CreateUser } from "./services/CreateUser.service";
import { UsersRepository } from "./repositories/users.repository";
import { PrismaUsersRepository } from "./infra/prisma/repositories/users.repository";
import { PrismaService } from "@database/prisma.service";
import { HashProvider, hashProviders } from "./providers/HashProvider";
import { AuthenticateUser } from "./services/AuthenticateUser.service";
import { JwtProvider, jwtProviders } from "./providers/JwtProvider";

@Module({
    controllers: [UsersController],
    exports: [UsersRepository],
    providers: [
      PrismaService,
      {
        provide: UsersRepository,
        useClass: PrismaUsersRepository,
      },
      {
        provide: HashProvider,
        useClass: hashProviders[process.env.HASH_DRIVER],
      },
      {
        provide: JwtProvider,
        useClass: jwtProviders[process.env.JWT_DRIVER],
      },
      AuthenticateUser,
      CreateUser,
    ],
})
export class UsersModule { }
