import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { ProductService } from './product.service';

@Controller('product-alter')
export class ProductAlterController {
  constructor(private readonly productService: ProductService) { }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  async alterFind(@Param('id', IdValidationPipe) id: string) {
    return this.productService.alterFindProductWithReviews(id);
  }
}
