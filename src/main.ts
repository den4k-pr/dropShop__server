import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.enableShutdownHooks();
  app.setGlobalPrefix('api');
  app.enableCors();

  const port = process.env.PORT || 3000;

  await app.listen(port);
}
