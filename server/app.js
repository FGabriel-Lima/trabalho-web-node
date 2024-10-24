const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const pokemonRoutes = require('./routes/pokemonRoutes');
const config = require('./config');

const app = express();

// Middleware para permitir JSON no body das requisições
app.use(express.json());

// Configuração do CORS
app.use(cors());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Conectar ao MongoDB
mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.log('Erro ao conectar ao MongoDB', err));

// Rotas da API
app.use('/api', pokemonRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
