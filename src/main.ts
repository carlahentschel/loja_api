import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //precisa "dizer" pro Nest que queremos usar o Global Pipes para conseguir usar as
  //validações utilizadas nos dto's:
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //transforma o JSON recebido na requisição para um objeto da classe que vamos usar como tipo do parâmetro no método do controller decorado com o @Body.
      whitelist: true, //essa configuração indica que as chaves do JSON devem ser iguais ao do objeto no qual o JSON será transformado, ignorando chaves que não são pareáveis a atributos do objeto.
      forbidNonWhitelisted: true, //indica que qualquer chave que vier que não tiver par no objeto final deverá causar um erro, o que sinaliza que o cliente da nossa api está tentando enviar dados que não aceitamos.
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
