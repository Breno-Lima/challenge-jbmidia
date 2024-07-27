/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: [
          ".env.local",
          ".env",
          ...(process.env.NODE_ENV === "production"
            ? [".env.production.local", ".env.prodution"]
            : [".env.development.local", ".env.development"]),
        ],
      }),
      UsersModule,
    ],
    providers: [],
})
export class AppModule { }
