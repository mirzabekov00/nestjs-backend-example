import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("nest.js example backend application")
    .setDescription("rest api documentation")
    .setVersion("1.0.0")
    .addTag("mirzabekov")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT);

  const appUrl = await app.getUrl();

  console.log(`application is running on: ${appUrl}`);
}
bootstrap();
