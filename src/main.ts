import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    app.setGlobalPrefix('api');
    app.enableCors();

    const port = process.env.PORT || 3000;

    await app.listen(port, () => {
      console.log(`Application is listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error during application bootstrapping:', error);
    throw error;
  }
}

bootstrap()
