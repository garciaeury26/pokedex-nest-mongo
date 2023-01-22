import { Module } from '@nestjs/common';
import { PokedexService } from './pokedex.service';
import { PokedexController } from './pokedex.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokedex, PokedexSchema } from './entities/pokedex.entity';

@Module({
  controllers: [PokedexController],
  providers: [PokedexService],
  imports: [
    MongooseModule.forFeature([
      {
        // el => .name => no es del extend Documen no del pokedex
        // simplemente esa clase coje el nombre de la variable y la pone
        // en plurar
        name: Pokedex.name,
        // esto ase la referencia propia al schema de mongo
        schema: PokedexSchema,
      }
    ])
  ],
})
export class PokedexModule { }
