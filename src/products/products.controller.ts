import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Product } from './entities/product.entity';
import { ApiTags } from '@nestjs/swagger';

@Crud({
	model: {
		type: Product,
	},
})
@ApiTags('Products')
@Controller('products')
export class ProductsController implements CrudController<Product> {
	constructor(public service: ProductsService) {}
}
