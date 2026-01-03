
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Swagger
  setupSwagger(app);

  // Setup CORS
  // Allow all localhost origins from port 3000 to 3019
  const allowedOrigins = [
    ...Array.from({ length: 20 }, (_, i) => `http://localhost:${3000 + i}`),
    'https://job-in-rw.vercel.app',
  ];
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // Check DB connection
  const prisma = app.get(PrismaService);
  try {
    await prisma.$connect();
    console.log('✅ Database connected');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }

  // Start server
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  const appUrl = `http://localhost:${port}`;
  console.log(`🚀 Server running on: ${appUrl}`);
  console.log(`📚 Swagger docs available at: ${appUrl}/api`);
  console.log(`🌐 Allowed origins: ${allowedOrigins.join(', ')}`);
}
bootstrap();
