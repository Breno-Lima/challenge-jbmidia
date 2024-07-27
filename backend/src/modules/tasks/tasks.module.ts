import { AuthMiddleware } from "../users/middlewares/auth.middleware";
import { PrismaService } from "@database/prisma.service";
import { Module, type MiddlewareConsumer } from "@nestjs/common";
import { TasksController } from "./infra/http/controllers/tasks.controller";
import { PrismaTasksRepository } from "./infra/prisma/repositories/tasks.repository";
import { TasksRepository } from "./repositories/tasks.repository";
import { CreateTask } from "./services/CreateTask.service";
import { UsersModule } from "../users/users.module";
import { DeleteTask } from "./services/DeleteTask.service";

@Module({
    controllers: [TasksController],
    imports: [UsersModule],
    providers: [
        PrismaService,
        {
            provide: TasksRepository,
            useClass: PrismaTasksRepository,
        },
        CreateTask,
        DeleteTask,
    ],
})
export class TasksModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(TasksController);
    }
}
