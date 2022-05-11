# backend_saas

# Projeto criado para estudo API Node.js com Typescript

# Tecnologias 
 - Typescript 
 - Prettier e eslint para organização do codigo.
 - express
 - Banco de dados Postgres
 - TypeORM
 - Jwt para o geração do Token
 - biblioteca bcryptjs para criptografar senha.

# Passos para executar o projeto
- Faça o clone da aplicação
- Execute yarn para baixar as dependências.
- Crie um arquivo .env na raiz do projeto com a configuração da conexão com o Banco de dados. (seguir o aquivo 'exemplo_arquivoenv')
- Para criar as tabelas do banco com o TypeORM execute o comando:
    yarn typeorm migration:run -c db-postgres
- Para executar o projeto execute o comando:
     yarn start:dev
