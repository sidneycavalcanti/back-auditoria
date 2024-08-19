# Define a imagem base
FROM node

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json para o diretório de trabalho
COPY package.json .

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do diretório atual para o diretório de trabalho
COPY . .

EXPOSE 5000

# Define o comando de inicialização do backend em modo de desenvolvimento
CMD ["npm", "stat"]