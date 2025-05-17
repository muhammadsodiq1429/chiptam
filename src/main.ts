import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 3333;
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.use(cookieParser());
    app.setGlobalPrefix("api");

    await app.listen(PORT, () => {
      console.log(PORT);
    });
  } catch {}
}
bootstrap();
