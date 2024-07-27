import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export abstract class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsString()
    username: string;
}
