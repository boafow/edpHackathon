const mongoose = require('mongoose');

const planetsSchema = new mongoose.Schema(
    {
        id: Number,
        climate: String,
        surface_water: String,
        name: String,
        diameter: String,
        rotation_period: String,
        terrain: String,
        gravity: String,
        orbital_period: String,
        population: String
    }
);

const Planets = mongoose.model('planets', planetsSchema);
const Films = mongoose.model('film', filmsSchema);
const Characters = mongoose.model('character', charactersSchema);
const Films_characters = mongoose.model('films_characters', filmsCharactersSchema);
const Films_planets = mongoose.model('films_planets', filmsPlanetsSchema);

module.exports = {
    Planets, Films, Characters, Films_characters, Films_planets
} 
