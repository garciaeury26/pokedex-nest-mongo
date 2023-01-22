import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokedex as PokedexEntity } from '../pokedex/entities/pokedex.entity';
import { Pokedex, PokemonsProps } from '../interfaces/pokedex';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(PokedexEntity.name)
    private readonly pokemonModel: Model<PokedexEntity>
  ) { }

  async getDateBySeed() {

    try {

      // borrar los anteriores antes de insertar
      await this.pokemonModel.deleteMany();

      const resp = await fetch('https://pokeapi.co/api/v2/pokemon?lim0it=10&offset=0')
      const data: Pokedex = await resp.json();

      const pokemonCollection: PokemonsProps[] = data.results.map(({ name, url }) => {
        // inserta un elemento en un array cada vez que en cuentre => '/' esto
        // [ 'https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', '' ]
        const segments = url.split('/');
        // optener la antepenultimo elento
        const no: number = +segments[segments.length - 2];

        return {
          name,
          no
        }
      });

      await this.pokemonModel.insertMany(pokemonCollection)

      return data;
    } catch (error) {
      console.log(error)
      if (error.code === 1100) {
        throw new InternalServerErrorException('Se ha encontrado un campo duplicado');
      }
      throw new InternalServerErrorException()
    }
  }

}
