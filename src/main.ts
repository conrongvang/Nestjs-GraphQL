import { ValidationPipe, VersioningType } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppConfigs } from "app.config";
import { ResponseTransformerInterceptor } from "common/interceptors/response-transformer.interceptor";
import { TimeoutInterceptor } from "common/interceptors/timeout.interceptor";
import { AppLoggerService } from "common/logger.service";
import { AllExceptionsFilter } from "common/middlewares/all-exception.filter";
import { HttpExceptionFilter } from "common/middlewares/http-exception.filter";
import * as compression from "compression";
import * as fs from "fs";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function swaggerBuilder(app: NestExpressApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(AppConfigs.title)
    .setDescription(`Swagger document for ${AppConfigs.title} APIs`)
    .setVersion("1.0")
    .addTag("Stock")
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("swagger", app, swaggerDocument);

  return swaggerDocument;
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new AppLoggerService(),
  });

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  });

  const { httpAdapter } = app.get(HttpAdapterHost);

  app
    .setGlobalPrefix("/api")
    .enableVersioning({ type: VersioningType.URI })
    .use(
      helmet({
        contentSecurityPolicy: AppConfigs.isProd ? true : false,
      })
    )
    .useGlobalFilters(new AllExceptionsFilter(httpAdapter))
    .useGlobalFilters(new HttpExceptionFilter())
    .useGlobalInterceptors(new ResponseTransformerInterceptor())
    .useGlobalInterceptors(new TimeoutInterceptor());

  if (AppConfigs.isProd) {
    app.use(compression());
  }

  app.enableShutdownHooks().useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
  const swaggerDocument = await swaggerBuilder(app);
  await app.listen(AppConfigs.port);
  swaggerDocument.servers?.push({
    url: await app.getUrl(),
  });
  fs.writeFileSync("./swagger-doc.json", JSON.stringify(swaggerDocument));

  return app;
}
bootstrap().then(async (app) => {
  console.log(`Application start on port ${await app.getUrl()}`);
});
