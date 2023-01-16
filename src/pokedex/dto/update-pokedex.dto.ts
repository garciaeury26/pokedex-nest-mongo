import { PartialType } from '@nestjs/mapped-types';
import { CreatePokedexDto } from './create-pokedex.dto';

export class UpdatePokedexDto extends PartialType(CreatePokedexDto) {}
