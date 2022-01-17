import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT);

  const appUrl = await app.getUrl();

  console.log(`Application is running on: ${appUrl}`);
}
bootstrap();
