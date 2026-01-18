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
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';

@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) { }

  // Create a new product (Admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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

  // Update product (Admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put('produits/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProduitDto: UpdateProduitDto,
  ) {
    return this.catalogueService.update(id, updateProduitDto);
  }

  // Delete product (Admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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

  // Get products with low stock (Admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('produits/low-stock')
  findLowStock() {
    return this.catalogueService.findLowStock();
  }
}

