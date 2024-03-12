import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CaracteristicaProdutoDTO } from './CaracteristicaProduto.dto';
import { Type } from 'class-transformer';

export class CriaProdutoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome do produto não pode ser vazio.' })
  nome: string;

  //valor do produto precisa ser um número positivo (não pode ser zero) e ter até duas casas decimais;
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'O valor do produto precisa ser maior que zero' })
  valor: number;

  //quantidade precisa ser um número igual ou maior que zero;
  @IsNumber()
  @Min(0, { message: 'Quantidade mínima inválida' })
  quantidade: number;

  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode ser vazia.' })
  @MaxLength(1000, {
    message: 'Descrição do produto deve ter no máximo 1000 caracteres.',
  })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @Type(() => CaracteristicaProdutoDTO)
  @ArrayMinSize(3)
  //lista de características do produto precisa ter pelo menos 3 itens;
  caracteristicas: CaracteristicaProdutoDTO[];

  @IsString()
  @IsNotEmpty({ message: 'A categoria do produto não pode ser vazia.' })
  categoria: string;
}
