import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { Pokedex } from '../interfaces/pokedex';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class SeedService {

  async getDateBySeed() {
    try {
      const resp = await fetch('https://pokeapi.co/api/v2/pokemon?lim0it=10&offset=0')
      const data: Pokedex = await resp.json();

      data.results.forEach(({ name, url }) => {

        // inserta un elemento en un array cada vez que en cuentre => '/' esto
        // [ 'https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', '' ]
        const segments = url.split('/');
        // optener la antepenultimo elento
        const no: number = +segments[segments.length - 2];
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException()
    }
  }

}
