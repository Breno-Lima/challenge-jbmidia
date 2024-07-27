import { PrismaService } from "@database/prisma.service";
import { CreateTaskDTO } from "@modules/tasks/dtos/CreateTask.dto";
import { Task } from "@prisma/client";
import type { TasksRepository } from "@modules/tasks/repositories/tasks.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
    constructor(private readonly prisma: PrismaService) {}

    public async create(data: CreateTaskDTO): Promise<Task> {
        const task = await this.prisma.task.create({
            data,
        });

        return task;
    }

    public async delete(taskId: string): Promise<Task> {
        const task = await this.prisma.task.delete({
            where: {
                id: taskId,
            },
        });

        return task;
    }

    public async findById(taskId: string): Promise<Task | null> {
        const task = await this.prisma.task.findUnique({
            where: {
                id: taskId,
            },
        });

        return task;
    }
}
