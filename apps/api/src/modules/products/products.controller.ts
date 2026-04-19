import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { QueryProductDto } from './dto/query-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: '取得商品列表（分頁）' })
  findAll(@Query() query: QueryProductDto) {
    return this.productsService.findAll(query);
  }

  @Get('all')
  @ApiOperation({ summary: '取得所有商品（不分頁）' })
  findAllWithoutPagination() {
    return this.productsService.findAllWithoutPagination();
  }

  @Get(':id')
  @ApiOperation({ summary: '取得單一商品' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}