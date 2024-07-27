import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export abstract class CreateTaskReqDTO {
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;
}
