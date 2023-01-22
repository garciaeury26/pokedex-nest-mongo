import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokedexModule } from '../pokedex/pokedex.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokedex, PokedexSchema } from '../pokedex/entities/pokedex.entity'

@Module({
  imports: [PokedexModule, MongooseModule.forFeature([
    {
      // el => .name => no es del extend Documen no del pokedex
      // simplemente esa clase coje el nombre de la variable y la pone
      // en plurar
      name: Pokedex.name,
      // esto ase la referencia propia al schema de mongo
      schema: PokedexSchema,
    }
  ])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule { }
