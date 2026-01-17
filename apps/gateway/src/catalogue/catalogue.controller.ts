import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { CreateProduitDto, UpdateProduitDto, FilterProduitsDto } from './dto';
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

  // Get all products with pagination and filters (Public - for visitors)
  @Get('produits')
  findAll(@Query() filterDto: FilterProduitsDto) {
    return this.catalogueService.findAllPaginated(filterDto);
  }

  // Get single product by ID (Public - for visitors)
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

  // Get all categories (Public - for visitors to filter)
  @Get('categories')
  findAllCategories() {
    return this.catalogueService.findAllCategories();
  }

  // Get products by category (Public - for visitors)
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

