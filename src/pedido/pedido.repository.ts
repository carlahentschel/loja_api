import { Injectable } from '@nestjs/common';
import { PedidoEntity } from './pedido.entity';

@Injectable()
export class PedidoRepository {
  private pedidos: PedidoEntity[] = [];
}
