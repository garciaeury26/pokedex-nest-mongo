import { IsNumber, IsOptional, IsPositive, MinLength, Min } from 'class-validator';

export class GetPaginatedDto {

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(1)
    limit: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset: number;
}