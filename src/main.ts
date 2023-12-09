import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppConfig } from './app/config/app-config';
import { GraphqlExceptionFilter } from './api/graphql/exception-filters/exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GraphqlExceptionFilter())

  const appConfig = app.get(AppConfig);

  await app.listen(appConfig.port);
}
bootstrap();
