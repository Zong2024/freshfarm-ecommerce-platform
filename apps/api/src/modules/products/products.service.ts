import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(query: QueryProductDto) {
    const { page = 1, limit = 10, category } = query;
    const qb = this.productRepository.createQueryBuilder('product');

    if (category) {
      qb.where('product.category = :category', { category });
    }

    const [products, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      success: true,
      products,
      pagination: {
        total_pages: Math.ceil(total / limit),
        current_page: page,
        has_pre: page > 1,
        has_next: page < Math.ceil(total / limit),
        category: category ?? null,
      },
    };
  }

  async findAllWithoutPagination() {
    const products = await this.productRepository.find();
    return {
      success: true,
      products,
    };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return {
      success: true,
      product,
    };
  }
}