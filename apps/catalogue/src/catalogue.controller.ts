import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CatalogueService } from './catalogue.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) { }

  // Create a new product
  @MessagePattern('create_produit')
  create(@Payload() createProduitDto: CreateProduitDto) {
    return this.catalogueService.create(createProduitDto);
  }

  // Get all products
  @MessagePattern('get_all_produits')
  findAll() {
    return this.catalogueService.findAll();
  }

  // Get single product by ID
  @MessagePattern('get_produit')
  findOne(@Payload() id: number) {
    return this.catalogueService.findOne(id);
  }

  // Update product
  @MessagePattern('update_produit')
  update(@Payload() data: { id: number; updateProduitDto: UpdateProduitDto }) {
    return this.catalogueService.update(data.id, data.updateProduitDto);
  }

  // Delete product
  @MessagePattern('delete_produit')
  remove(@Payload() id: number) {
    return this.catalogueService.remove(id);
  }

  // Get products by category
  @MessagePattern('get_produits_by_category')
  findByCategory(@Payload() categoryId: number) {
    return this.catalogueService.findByCategory(categoryId);
  }

  // Get products with low stock
  @MessagePattern('get_low_stock_produits')
  findLowStock() {
    return this.catalogueService.findLowStock();
  }
}

