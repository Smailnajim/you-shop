import {
    IsOptional,
    IsNumber,
    IsString,
    Min,
    Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FilterProduitsDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    categoryId?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    minPrix?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    maxPrix?: number;

    @IsOptional()
    @IsString()
    search?: string;
}
