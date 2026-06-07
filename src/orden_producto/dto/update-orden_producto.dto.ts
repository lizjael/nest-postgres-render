import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdenProductoDto } from './create-orden_producto.dto';

export class UpdateOrdenProductoDto extends PartialType(CreateOrdenProductoDto) {}
