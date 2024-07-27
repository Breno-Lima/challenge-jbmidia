import type { Task } from "@prisma/client";
import { TasksRepository } from "../repositories/tasks.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListTasks {
    constructor(private readonly tasksRepository: TasksRepository) {}

    public async execute(userId: string): Promise<Task[]> {
        const tasks = await this.tasksRepository.findAll(userId);
        return tasks;
    }
}
