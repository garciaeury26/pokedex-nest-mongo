import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UsePipes, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokedexDto } from './dto/create-pokedex.dto';
import { UpdatePokedexDto } from './dto/update-pokedex.dto';
import { Pokedex } from './entities/pokedex.entity';
import { GetPaginatedDto } from './dto/get-paginated-pokedex.dto';

@Injectable()
export class PokedexService {

  constructor(
    // nececito usar este decorador ya que mi entinty no es un servicio como tal
    @InjectModel(Pokedex.name)
    private readonly pokemonModule: Model<Pokedex>
  ) { }

  async create(createPokedexDto: CreatePokedexDto) {

    try {
      createPokedexDto.name = createPokedexDto.name.toLocaleLowerCase();
      const pokedex = await this.pokemonModule.create(createPokedexDto);
      return pokedex

    } catch (error) {
      this.handleExpections(error)
    }

  }

  async findAll(queryData: GetPaginatedDto) {
    const { limit, offset } = queryData
    const data = await this.pokemonModule.find()
      .skip(offset)
      .limit(limit)
      .sort({
        no: 1
      })
      .select('-__v');

    return data;
  }

  async findOne(id: string) {
    let pokedex: Pokedex;

    try {

      // obtener por no
      if (!isNaN(+id)) {
        pokedex = await this.pokemonModule.findOne({ no: id });
      }

      // obtner por  MongoID
      if (!pokedex && isValidObjectId(id)) {
        pokedex = await this.pokemonModule.findById(id);
      }

      if (!pokedex) {
        // obtener por nombre
        pokedex = await this.pokemonModule.findOne({ name: id.toLocaleLowerCase().trim() });
      }

      if (!pokedex) {
        throw new NotFoundException()
      }

      return {
        ok: true,
        pokedex
      };

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }

  async update(id: string, updatePokedexDto: UpdatePokedexDto) {
    const { pokedex } = await this.findOne(id);

    if (updatePokedexDto.name) {
      updatePokedexDto.name = updatePokedexDto.name.toLocaleLowerCase().trim()
    }

    try {
      // el new:true => indica que me devuelva el obejeto actualizado y no el viejo
      await pokedex.updateOne(updatePokedexDto, { new: true });
      return { ...pokedex.toJSON(), ...updatePokedexDto }

    } catch (error) {
      this.handleExpections(error)
    }
  }

  async remove(id: string) {
    // const {pokedex} = await this.findOne(id)
    // await pokedex.deleteOne()
    // or short form
    // const { name } = await this.pokemonModule.findByIdAndDelete(id);

    const { deletedCount, acknowledged } = await this.pokemonModule.deleteOne({ _id: id });

    // si deletedCount = 0 => significa que ese _id no existe
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id ${id} not found`)
    }

    return `Pokemon with ${id} deleted`;
  }

  private handleExpections(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error)
    throw new InternalServerErrorException()
  }
}
