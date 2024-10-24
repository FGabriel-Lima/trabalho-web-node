const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemon');

// Rota para obter todos os Pokémons
router.get('/pokemons', async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (error) {
    console.error('Erro ao buscar Pokémons:', error);
    res.status(500).json({ message: 'Erro ao buscar Pokémons', error });
  }
});

// Rota para obter um Pokémon específico pelo ID
router.get('/pokemons/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon não encontrado' });
    }
    res.json(pokemon);
  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error);
    res.status(500).json({ message: 'Erro ao buscar Pokémon', error });
  }
});

// Rota para criar um novo Pokémon
router.post('/pokemons', async (req, res) => {
  const { name, number, type, image } = req.body;

  // Verificação para garantir que todos os campos são fornecidos
  if (!name || !number || !type || !image) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  const newPokemon = new Pokemon({ name, number, type, image });

  try {
    await newPokemon.save();
    res.status(201).json(newPokemon);
  } catch (error) {
    console.error('Erro ao adicionar o Pokémon:', error);
    res.status(500).json({ message: 'Erro ao adicionar o Pokémon', error });
  }
});

// Rota para atualizar um Pokémon existente pelo ID
router.put('/pokemons/:id', async (req, res) => {
  const { name, number, type, image } = req.body;

  try {
    const pokemon = await Pokemon.findByIdAndUpdate(
      req.params.id,
      { name, number, type, image },
      { new: true, runValidators: true }
    );
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon não encontrado' });
    }
    res.json(pokemon);
  } catch (error) {
    console.error('Erro ao atualizar o Pokémon:', error);
    res.status(500).json({ message: 'Erro ao atualizar o Pokémon', error });
  }
});

// Rota para remover um Pokémon pelo ID
router.delete('/pokemons/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon não encontrado' });
    }
    res.json({ message: 'Pokémon removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover o Pokémon:', error);
    res.status(500).json({ message: 'Erro ao remover o Pokémon', error });
  }
});

module.exports = router;
