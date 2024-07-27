import type { Task } from "@prisma/client";
import type { CreateTaskDTO } from "../dtos/CreateTask.dto";

export abstract class TasksRepository {
    abstract create(data: CreateTaskDTO): Promise<Task>;
    abstract delete(taskId: string): Promise<Task>;
    abstract findById(taskId: string): Promise<Task | null>;
}
