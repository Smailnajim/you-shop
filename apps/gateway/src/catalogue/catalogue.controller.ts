import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { CreateProduitDto, UpdateProduitDto } from './dto';
import { JwtAuthGuard } from '../auth/guards';

@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) { }

  // Create a new product (Protected)
  @UseGuards(JwtAuthGuard)
  @Post('produits')
  create(@Body() createProduitDto: CreateProduitDto) {
    return this.catalogueService.create(createProduitDto);
  }

  // Get all products (Public)
  @Get('produits')
  findAll() {
    return this.catalogueService.findAll();
  }

  // Get single product by ID (Public)
  @Get('produits/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catalogueService.findOne(id);
  }

  // Update product (Protected)
  @UseGuards(JwtAuthGuard)
  @Put('produits/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProduitDto: UpdateProduitDto,
  ) {
    return this.catalogueService.update(id, updateProduitDto);
  }

  // Delete product (Protected)
  @UseGuards(JwtAuthGuard)
  @Delete('produits/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.catalogueService.remove(id);
  }

  // Get products by category (Public)
  @Get('categories/:categoryId/produits')
  findByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.catalogueService.findByCategory(categoryId);
  }

  // Get products with low stock (Protected)
  @UseGuards(JwtAuthGuard)
  @Get('produits/low-stock')
  findLowStock() {
    return this.catalogueService.findLowStock();
  }
}

