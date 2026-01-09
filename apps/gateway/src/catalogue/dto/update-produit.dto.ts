import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, Min } from 'class-validator';

export class UpdateProduitDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    prix?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    quantity?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    quantityAlert?: number;

    @IsOptional()
    @IsBoolean()
    visible?: boolean;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    SKU?: string[];

    @IsOptional()
    @IsNumber()
    categoryId?: number;
}
