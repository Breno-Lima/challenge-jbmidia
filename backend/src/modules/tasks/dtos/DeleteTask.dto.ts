import { IsNotEmpty, IsUUID } from "class-validator";
import { IsString } from "class-validator";

export class DeleteTaskDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    taskId: string;
}
