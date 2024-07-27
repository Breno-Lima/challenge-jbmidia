import { DeleteTask } from "./../../../services/DeleteTask.service";
import { Request } from "express";
import { CreateTaskReqDTO } from "@modules/tasks/dtos/CreateTaskReq.dto";
import { Body, Controller, Delete, Param, Post, Req } from "@nestjs/common";
import { CreateTask } from "@modules/tasks/services/CreateTask.service";

@Controller("tasks")
export class TasksController {
    constructor(
        private readonly createTask: CreateTask,
        private readonly deleteTask: DeleteTask,
    ) {}

    @Post()
    public async postTasks(
        @Body() body: CreateTaskReqDTO,
        @Req() req: Request,
    ) {
        const { userId } = req;

        const task = await this.createTask.execute({
            ...body,
            userId,
        });

        return task;
    }

    @Delete("/:id")
    public async DeleteTasks(@Param("id") taskId: string, @Req() req: Request) {
        const { userId } = req;

        const task = await this.deleteTask.execute({
            taskId,
            userId,
        });

        return task;
    }
}
