import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma } from './generated/prisma/client';

@Injectable()
export class CatalogueRepository {
    constructor(private readonly prisma: PrismaService) { }

    // Create a new product
    async create(data: Prisma.ProduitsCreateInput) {
        return this.prisma.produits.create({
            data,
            include: { category: true },
        });
    }

    // Find all products
    async findAll() {
        return this.prisma.produits.findMany({
            include: { category: true },
        });
    }

    // Find product by ID
    async findById(id: number) {
        return this.prisma.produits.findUnique({
            where: { id },
            include: { category: true },
        });
    }

    // Find product by name
    async findByName(name: string) {
        return this.prisma.produits.findUnique({
            where: { name },
        });
    }

    // Update product
    async update(id: number, data: Prisma.ProduitsUpdateInput) {
        return this.prisma.produits.update({
            where: { id },
            data,
            include: { category: true },
        });
    }

    // Delete product
    async delete(id: number) {
        return this.prisma.produits.delete({
            where: { id },
        });
    }

    // Find products by category
    async findByCategory(categoryId: number) {
        return this.prisma.produits.findMany({
            where: { categoryId },
            include: { category: true },
        });
    }

    // Find products with low stock (quantity <= quantityAlert)
    async findLowStock() {
        return this.prisma.$queryRaw`
      SELECT * FROM "Produits" WHERE quantity <= "quantityAlert"
    `;
    }
}
