const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  type: { 
    type: String, 
    enum: ['Fire', 'Water', 'Grass', 'Electric', 'Rock', 'Ground', 'Psychic', 'Dark', 'Fairy', 'Dragon', 'Ice'], 
    required: true 
  },
  image: { type: String, required: true }
});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;
