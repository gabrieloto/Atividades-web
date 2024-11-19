const express = require('express');
const app = express();

// Middleware para tratar JSON
app.use(express.json());

// Array inicial de animes
let animes = [
  {
    id: 1,
    name: 'Attack on Titan',
    genre: 'Action',
    studio: 'Wit Studio'
  }
];

// Operações CRUD

// Listar todos os animes
app.get('/animes', (req, res) => {
  res.json(animes);
});

// Listar um anime por ID
app.get('/animes/:id', (req, res) => {
  const anime = animes.find(a => a.id === parseInt(req.params.id));
  if (!anime) return res.status(404).send('Anime não encontrado.');
  res.json(anime);
});

// Criar um novo anime
app.post('/animes', (req, res) => {
  const { name, genre, studio } = req.body;

  const animeExistente = animes.find(
    (a) => a.name === name && a.genre === genre && a.studio === studio
  );

  // Validação
  if (!name || !genre || !studio) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  if (animeExistente) {
    return res.status(400).send('Este anime já existe.');
  }

  const newAnime = {
    id: animes.length + 1, // Geração simples de ID
    name,
    genre,
    studio
  };

  animes.push(newAnime);
  res.status(201).json(newAnime);
});

// Atualizar um anime por ID
app.put('/animes/:id', (req, res) => {
  const { name, genre, studio } = req.body;
  const anime = animes.find(a => a.id === parseInt(req.params.id));

  if (!anime) return res.status(404).send('Anime não encontrado.');

  // Validação
  if (!name || !genre || !studio) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  anime.name = name;
  anime.genre = genre;
  anime.studio = studio;

  res.json(anime);
});

// Deletar um anime por ID
app.delete('/animes/:id', (req, res) => {
  const animeIndex = animes.findIndex(a => a.id === parseInt(req.params.id));

  if (animeIndex === -1) return res.status(404).send('Anime não encontrado.');

  animes.splice(animeIndex, 1);
  res.status(204).send(); // No content
});

module.exports = app;
