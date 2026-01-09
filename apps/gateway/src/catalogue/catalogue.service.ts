import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@Injectable()
export class CatalogueService {
  constructor(
    @Inject('CATALOGUE_CLIENT') private catalogueClient: ClientProxy,
  ) {}

  // Create a new product
  async create(createProduitDto: CreateProduitDto) {
    return firstValueFrom(
      this.catalogueClient.send('create_produit', createProduitDto),
    );
  }

  // Get all products
  async findAll() {
    return firstValueFrom(this.catalogueClient.send('get_all_produits', {}));
  }

  // Get single product by ID
  async findOne(id: number) {
    return firstValueFrom(this.catalogueClient.send('get_produit', id));
  }

  // Update product
  async update(id: number, updateProduitDto: UpdateProduitDto) {
    return firstValueFrom(
      this.catalogueClient.send('update_produit', { id, updateProduitDto }),
    );
  }

  // Delete product
  async remove(id: number) {
    return firstValueFrom(this.catalogueClient.send('delete_produit', id));
  }

  // Get products by category
  async findByCategory(categoryId: number) {
    return firstValueFrom(
      this.catalogueClient.send('get_produits_by_category', categoryId),
    );
  }

  // Get products with low stock
  async findLowStock() {
    return firstValueFrom(
      this.catalogueClient.send('get_low_stock_produits', {}),
    );
  }
}
