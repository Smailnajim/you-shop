import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  Min,
} from 'class-validator';

export class CreateProduitDto {
  @IsString()
  name!: string;

  @IsNumber()
  @Min(0)
  prix!: number;

  @IsNumber()
  @Min(0)
  quantity!: number;

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

  @IsString()
  category!: string;
}
