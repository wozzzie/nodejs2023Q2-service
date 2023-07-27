import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { INestApplication } from '@nestjs/common';
import { config } from 'dotenv';

interface ApiConfig {
  info: {
    title: string;
    description: string;
    version: string;
  };
}

async function bootstrap() {
  config();

  const app = await createNestApp();
  const apiConfig = await loadConfig();
  const document = createSwaggerDocument(app, apiConfig);

  setupSwagger(app, document);

  await startServer(app);
}

async function createNestApp(): Promise<INestApplication> {
  return await NestFactory.create(AppModule);
}

async function loadConfig(): Promise<ApiConfig> {
  const apiPath = join(__dirname, '..', 'doc/api.yaml');
  const apiYaml = await readFile(apiPath, 'utf-8');
  return load(apiYaml) as ApiConfig;
}

function createSwaggerDocument(
  app: INestApplication,
  apiConfig: ApiConfig,
): OpenAPIObject {
  const options = new DocumentBuilder()
    .setTitle(apiConfig.info.title)
    .setDescription(apiConfig.info.description)
    .setVersion(apiConfig.info.version)
    .build();

  return SwaggerModule.createDocument(app, options);
}

function setupSwagger(app: INestApplication, document: OpenAPIObject): void {
  SwaggerModule.setup('docs', app, document);
}

async function startServer(app: INestApplication): Promise<void> {
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Server - http://localhost:${port}`);
  console.log(`Docs - http://localhost:${port}/docs`);
}

bootstrap();
