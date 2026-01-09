import { Injectable, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CatalogueRepository } from './catalogue.repository';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@Injectable()
export class CatalogueService {
  constructor(private readonly catalogueRepository: CatalogueRepository) {}

  // Create a new product
  async create(createProduitDto: CreateProduitDto) {
    // Check if product with same name exists
    const existingProduct = await this.catalogueRepository.findByName(
      createProduitDto.name,
    );
    if (existingProduct) {
      throw new RpcException({
        message: 'Product with this name already exists',
        statusCode: HttpStatus.CONFLICT,
      });
    }
    const category = await this.catalogueRepository.findOrCreateCategory(
      createProduitDto.category,
    );

    return this.catalogueRepository.create({
      name: createProduitDto.name,
      prix: createProduitDto.prix,
      quantity: createProduitDto.quantity,
      quantityAlert: createProduitDto.quantityAlert ?? 5,
      visible: createProduitDto.visible ?? true,
      SKU: createProduitDto.SKU ?? [],
      category: {
        connect: { id: category.id },
      },
    });
  }

  // Find all products
  async findAll() {
    return this.catalogueRepository.findAll();
  }

  // Find product by ID
  async findOne(id: number) {
    const product = await this.catalogueRepository.findById(id);
    if (!product) {
      throw new RpcException({
        message: `Product with ID ${id} not found`,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return product;
  }

  // Update product
  async update(id: number, updateProduitDto: UpdateProduitDto) {
    // Check if product exists
    await this.findOne(id);

    // Check if new name already exists (if name is being updated)
    if (updateProduitDto.name) {
      const existingProduct = await this.catalogueRepository.findByName(
        updateProduitDto.name,
      );
      if (existingProduct && existingProduct.id !== id) {
        throw new RpcException({
          message: 'Product with this name already exists',
          statusCode: HttpStatus.CONFLICT,
        });
      }
    }

    const updateData: any = { ...updateProduitDto };

    // Handle category relation if categoryId is provided
    if (updateProduitDto.categoryId) {
      delete updateData.categoryId;
      updateData.category = {
        connect: { id: updateProduitDto.categoryId },
      };
    }

    return this.catalogueRepository.update(id, updateData);
  }

  // Delete product
  async remove(id: number) {
    // Check if product exists
    await this.findOne(id);
    return this.catalogueRepository.delete(id);
  }

  // Find products by category
  async findByCategory(categoryId: number) {
    return this.catalogueRepository.findByCategory(categoryId);
  }

  // Find products with low stock
  async findLowStock() {
    return this.catalogueRepository.findLowStock();
  }
}

