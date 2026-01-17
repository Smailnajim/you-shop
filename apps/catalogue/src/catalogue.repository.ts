import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma } from './generated/prisma/client';

export interface PaginationParams {
    page?: number;
    limit?: number;
    categoryId?: number;
    minPrix?: number;
    maxPrix?: number;
    search?: string;
}

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

    // Find all products with pagination and filters
    async findAllPaginated(params: PaginationParams) {
        const { page = 1, limit = 10, categoryId, minPrix, maxPrix, search } = params;
        const skip = (page - 1) * limit;

        // Build where clause for filters
        const where: Prisma.ProduitsWhereInput = {
            visible: true, // Only show visible products to visitors
        };

        if (categoryId) {
            where.categoryId = categoryId;
        }

        if (minPrix !== undefined || maxPrix !== undefined) {
            where.prix = {};
            if (minPrix !== undefined) {
                where.prix.gte = minPrix;
            }
            if (maxPrix !== undefined) {
                where.prix.lte = maxPrix;
            }
        }

        if (search) {
            where.name = {
                contains: search,
                mode: 'insensitive',
            };
        }

        const [data, total] = await Promise.all([
            this.prisma.produits.findMany({
                where,
                skip,
                take: limit,
                include: { category: true },
                orderBy: { id: 'desc' },
            }),
            this.prisma.produits.count({ where }),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    // Find product by ID
    async findById(id: number) {
        return this.prisma.produits.findUnique({
            where: { id },
            include: { category: true },
        });
    }

    // Find category by name, create if not exists
    async findOrCreateCategory(name: string) {
        return await this.prisma.categories.upsert({
            where: { name },
            update: {}, // if category exists, do nothing
            create: { name }, // if category doesn't exist, create it
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

    // Find all categories
    async findAllCategories() {
        return this.prisma.categories.findMany({
            include: {
                _count: {
                    select: { produits: true },
                },
            },
            orderBy: { name: 'asc' },
        });
    }
}
