import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { ListaProdutoDTO } from './dto/ListaProduto.dto';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(dadosProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();

    produtoEntity.nome = dadosProduto.nome;
    produtoEntity.valor = dadosProduto.valor;
    produtoEntity.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
    produtoEntity.descricao = dadosProduto.descricao;
    produtoEntity.categoria = dadosProduto.categoria;
    produtoEntity.caracteristicas = dadosProduto.caracteristicas;
    produtoEntity.imagens = dadosProduto.imagens;

    return this.produtoRepository.save(produtoEntity);
  }

  async listaProdutos() {
    const produtosSalvos = await this.produtoRepository.find();
    const produtosLista = produtosSalvos.map(
      (produto) => new ListaProdutoDTO(produto.id, produto.nome),
    );

    return produtosLista;
  }

  async atualizaProduto(id: string, produtoEntity: AtualizaProdutoDTO) {
    const entityName = await this.produtoRepository.findOneBy({ id });
    Object.assign(entityName, produtoEntity);
    await this.produtoRepository.save(entityName);
  }

  async deletaProduto(id: string) {
    await this.produtoRepository.delete(id);
  }
}
