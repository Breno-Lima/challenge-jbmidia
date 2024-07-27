import type { Task } from "@prisma/client";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersRepository } from "@modules/users/repositories/users.repository";
import { TasksRepository } from "../repositories/tasks.repository";
import type { DeleteTaskDTO } from "../dtos/DeleteTask.dto";

@Injectable()
export class DeleteTask {
    constructor(
        private readonly tasksRepository: TasksRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    public async execute({ taskId, userId }: DeleteTaskDTO): Promise<Task> {
        const existingTask = await this.tasksRepository.findById(taskId);
        if (!existingTask) {
            throw new HttpException(
                "Task não existente.",
                HttpStatus.NOT_FOUND,
            );
        }
        if (existingTask.userId !== userId) {
            throw new HttpException(
                "Você não tem permissão para deletar essa task.",
                HttpStatus.FORBIDDEN,
            );
        }

        const task = await this.tasksRepository.delete(taskId);

        return task;
    }
}
