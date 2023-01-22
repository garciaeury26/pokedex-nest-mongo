import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokedexModule } from './pokedex/pokedex.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    // para poder usar las variables de entorno
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      // para validar que me llega la data como la espero
      validationSchema: JoiValidationSchema
    }),
    // solo pudes usar el forRoot en el AppModule
    // para usar esta caracteris ticas deves instalar el paquete +> server-static
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    // conectarse a mongoDB
    MongooseModule.forRoot(process.env.MONGODB),
    PokedexModule,
    CommonModule,
    SeedModule,
    HttpModule
  ],
  controllers: [],
})
export class AppModule {
  constructor() {
    console.log(process.env)
  }
}
