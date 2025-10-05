# 🧩 Back Auditoria (API)

API do sistema **Auditrack**, desenvolvida em **Node.js** e **Express**, com integração ao **MySQL** via Sequelize ORM.  
A API foi estruturada para rodar de forma independente ou integrada ao ambiente Docker (junto com o frontend e banco de dados).

---

## 🚀 Tecnologias Utilizadas

- **Node.js** 20+
- **Express.js**
- **Sequelize ORM**
- **MySQL 8**
- **Yup** (validação de dados)
- **Docker**

---

## 📂 Estrutura de Pastas

```
src/
│-- controllers/
│   └── userController.js
│-- services/
│   └── userService.js
│-- models/
│   └── User.js
│-- routes/
│   └── userRoutes.js
│-- validations/
│   └── userValidation.js
│-- config/
│   └── database.js
│-- index.js
```

---

## ⚙️ Arquivo `.env`

Exemplo de configuração local:

```env
NODE_ENV=production
PORT=5000

# Banco rodando no mesmo compose
DB_HOST=db
DB_PORT=3306
DB_NAME=audit_plaza
DB_USER=audit_plaza
DB_PASSWORD=P@ssw0rd

# CORS do Frontend
CORS_ORIGIN=http://localhost:3001
```

---

## 🐳 Dockerfile

```dockerfile
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

# Define o comando de inicialização do backend
CMD ["npm", "start"]
```

---

## 🧱 Execução Local

1. Clone o repositório:
   ```bash
   git clone https://github.com/sidneycavalcanti/back-auditoria.git
   cd back-auditoria
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env` conforme o exemplo acima.

4. Inicie o servidor:
   ```bash
   npm start
   ```

A API ficará disponível em:
```
http://localhost:5000
```

---

## 🐳 Execução com Docker

1. **Build da imagem:**
   ```bash
   docker build -t back-auditoria .
   ```

2. **Executar o container:**
   ```bash
   docker run -d -p 5000:5000 --name back-auditoria back-auditoria
   ```

---

## 🔗 Estrutura de Código

### 1️⃣ Validação (`src/validations/userValidation.js`)
Encapsula regras de validação com **Yup**.

### 2️⃣ Serviço (`src/services/userService.js`)
Camada responsável pela lógica de negócio.

### 3️⃣ Controlador (`src/controllers/userController.js`)
Lida com requisições e respostas, delegando lógica ao service.

### 4️⃣ Rotas (`src/routes/userRoutes.js`)
Define os endpoints da API.

---

## 📦 Build de Produção

Para gerar o build e rodar em produção:

```bash
npm ci --omit=dev
npm start
```

---

## 🔒 Boas Práticas

- Utilize `.env` separado para cada ambiente.
- Evite credenciais fixas dentro do código.
- Utilize containers para padronizar a execução.
- Sempre valide dados de entrada com **Yup**.

---

## 📄 Licença

Projeto sob licença **MIT** — livre para uso e modificação.

---

## 👨‍💻 Autor

**Sidney Cavalcanti**  
Infraestrutura, DevOps e Desenvolvimento Fullstack  
📧 [sidney@grupomtm.com.br](mailto:sidney@grupomtm.com.br)  
🌐 [GitHub](https://github.com/sidneycavalcanti)
