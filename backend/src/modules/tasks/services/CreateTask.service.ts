import type { Task } from "@prisma/client";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersRepository } from "@modules/users/repositories/users.repository";
import type { CreateTaskDTO } from "../dtos/CreateTask.dto";
import { TasksRepository } from "../repositories/tasks.repository";

@Injectable()
export class CreateTask {
    constructor(
        private readonly tasksRepository: TasksRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    public async execute({ userId, ...data }: CreateTaskDTO): Promise<Task> {
        const existingUser = await this.usersRepository.findById(userId);
        if (!existingUser) {
            throw new HttpException(
                "Usuário não existente.",
                HttpStatus.NOT_FOUND,
            );
        }

        const task = await this.tasksRepository.create({
            ...data,
            userId,
        });

        return task;
    }
}
