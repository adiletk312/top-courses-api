import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ReviewModule } from 'src/review/review.module';
import { ProductController } from './product.controller';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';
import { ProductAlterController } from './product-alter.controller';

@Module({
  controllers: [ProductController, ProductAlterController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductModel,
        schemaOptions: {
          collection: 'Product',
        },
      },
    ]),
    ReviewModule,
  ],
  providers: [ProductService],
})
export class ProductModule {}
