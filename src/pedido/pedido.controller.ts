import { Controller, Get, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { UsuarioService } from 'src/usuario/usuario.service';

@Controller('pedidos')
export class PedidoController {
  constructor(
    private readonly pedidoService: PedidoService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Get()
  async obtemPedidosDeUsuario(@Query('usuarioId') usuarioId: string) {
    const pedidos = await this.pedidoService.obtemPedidosDeUsuario(usuarioId);

    return pedidos;
  }
}
