import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.use(cookieParser());

    const config = new DocumentBuilder()
        .setTitle("API Breno")
        .setDescription("API para o sistema TODO da empresa jbmídia")
        .setVersion("1.0.0")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    const port = process.env.PORT || 3333;

    await app.listen(port, "0.0.0.0");

    console.log(`Server started on port ${port}!`);
}
bootstrap();
