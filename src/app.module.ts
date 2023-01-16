import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokedexModule } from './pokedex/pokedex.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // solo pudes usar el forRoot en el AppModule
    // para usar esta caracteris ticas deves instalar el paquete +> server-static
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokedexModule,
    CommonModule
  ],
  controllers: [],
})
export class AppModule { }
