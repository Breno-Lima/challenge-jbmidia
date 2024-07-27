import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { CreateTaskReqDTO } from "./CreateTaskReq.dto";

export abstract class CreateTaskDTO extends CreateTaskReqDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;
}
