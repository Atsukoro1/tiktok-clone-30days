import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as neo4j from 'neo4j-driver';
import * as cors from 'cors';

export let driver: neo4j.Driver;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", process.env.DB_PASS),
  );

  driver.verifyConnectivity()
  .then(() => {
    Logger.log("Succefully connected to Neo4J database!", 'DatabaseLoader');
  })
  .catch((err) => {
    Logger.error("Failed to connect to Neo4J database!", 'DatabaseLoader');
    console.error(err);
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
  }));

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
