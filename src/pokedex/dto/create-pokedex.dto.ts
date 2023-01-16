import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokedexDto {

    @IsString({ message: 'La propiedad deve de ser un string' })
    @MinLength(3, { message: 'Deve de tener almenos 3 caracteneres' })
    name: string

    @IsInt({ message: 'el campo deve de ser un numero' })
    @IsPositive()
    @Min(1)
    no: number

}
