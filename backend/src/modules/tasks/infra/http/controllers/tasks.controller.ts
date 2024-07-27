import { Request } from "express";
import { CreateTaskReqDTO } from "@modules/tasks/dtos/CreateTaskReq.dto";
import { Body, Controller, Post, Req } from "@nestjs/common";
import { CreateTask } from "@modules/tasks/services/CreateTask.service";

@Controller("tasks")
export class TasksController {
    constructor(private readonly createTask: CreateTask) {}

    @Post()
    public async postTasks(
        @Body() body: CreateTaskReqDTO,
        @Req() req: Request,
    ) {
        // @ts-ignore
        const { userId } = req;

        const task = await this.createTask.execute({
            ...body,
            userId,
        });

        return task;
    }
}
