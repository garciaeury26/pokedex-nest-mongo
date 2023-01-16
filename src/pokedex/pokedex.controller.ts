import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PokedexService } from './pokedex.service';
import { CreatePokedexDto } from './dto/create-pokedex.dto';
import { UpdatePokedexDto } from './dto/update-pokedex.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';

@Controller('pokedex')
export class PokedexController {
  constructor(private readonly pokedexService: PokedexService) { }

  @Post()
  @HttpCode(HttpStatus.OK) // => 200
  create(@Body() createPokedexDto: CreatePokedexDto) {
    return this.pokedexService.create(createPokedexDto);
  }

  @Get()
  findAll() {
    return this.pokedexService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokedexService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokedexDto: UpdatePokedexDto) {
    return this.pokedexService.update(id, updatePokedexDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokedexService.remove(id);
  }
}
