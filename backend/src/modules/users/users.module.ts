/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UsersController } from "./infra/http/controllers/users.controller";
import { CreateUser } from "./services/CreateUser.service";
import { UsersRepository } from "./repositories/users.repository";
import { PrismaUsersRepository } from "./infra/prisma/repositories/users.repository";
import { PrismaService } from "@database/prisma.service";
import { HashProvider, hashProviders } from "./providers/HashProvider";

@Module({
    controllers: [UsersController],
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
      CreateUser,
    ],
})
export class UsersModule { }
