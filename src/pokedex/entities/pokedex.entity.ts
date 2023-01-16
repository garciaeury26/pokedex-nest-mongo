
// ? es necesario extende la clase con esta para usar los decoaradores
import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// las entidades a como vamos a grabar en la base de datos
// cada instancia de esta clase seria un registro en la base de datos

// ! el decorador Schema es necesario
@Schema()
export class Pokedex extends Document {

    //id: string => mongo me lo da

    @Prop({
        unique: true,
        index: true,
    })
    name: string;


    @Prop({
        unique: true,
        index: true,
    })
    no: number;
}

// export esquema
export const PokedexSchema = SchemaFactory.createForClass(Pokedex);